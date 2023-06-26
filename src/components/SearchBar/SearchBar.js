import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FiEdit, FiUpload } from 'react-icons/fi';
import api from '../../service/api';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const SearchBar = ({ user, isLoggeedIn, setIsLoginModalOpen, onChange, onSearch }) => {


  const [aba, setAba] = useState('Explorar');
  const [tweetText, setTweetText] = useState('');

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tweetValid, setTweetValid] = useState(true);

  const createTweet = async (newTweet) => {
    try {
      // console.log(newTweet);
      if (selectedImage == null) {
        const response = await api.post(`/tweets/user/${user.id}`, newTweet)
        // window.location.reload();
      } else {
        
        const response = await api.post(`tweets/image/user/${user.id}`, newTweet, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // console.log(response)
        // window.location.reload();
      }

      // console.log(response.status);
      // if (response.status = 200) {



      // }



    } catch (error) {
      console.error(error);
    }
  }

  const handleTweetSubmit = (event) => {
    event.preventDefault();
    if (tweetText.length < 1 && selectedImage == null) {
      //Aparecer campo invalido
      setTweetValid(false);
    } else {
      let newTweet
      if (selectedImage == null) {
        newTweet = {
          text: tweetText
        }
      } else {
        newTweet = new FormData();
        newTweet.append('text', tweetText);
        newTweet.append('file', selectedImage);
      }


      console.log(newTweet);
      createTweet(newTweet);
      setIsWriteModalOpen(false)
      // setTimeout(function() {
      //   window.location.reload();
      // }, 100);
    }

  }




  const handleTweetTextChange = (event) => {
    setTweetValid(true);
    const value = event.target.value;
    if (value.length <= 280) {
      setTweetText(value);
    }
  };

  const handleImageChange = (event) => {
    setTweetValid(true);
    const file = event.target.files[0];
    setSelectedImage(file);
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const openWriteModal = () => {
    if (isLoggeedIn) {
      setIsWriteModalOpen(true);
    }
    else {
      setIsLoginModalOpen(true);
    }

  };

  const closeWriteModal = () => {
    setTweetValid(true);
    setIsWriteModalOpen(false);
    setSelectedImage(null);
    setImagePreview('');
    setTweetText('');
  };

  return (
    <div className="search-bar">
      <div className='div-explorar'>
        <a>{aba}</a>
      </div>
      <input
        type="text"
        placeholder="Pesquisar"
        onChange={onChange}
      />

      <button type="button" onClick={onSearch}>
        <FaSearch />
      </button>
      <button type="button" onClick={openWriteModal}>

        <FiEdit />

      </button>
      <Modal
        isOpen={isWriteModalOpen}
        onRequestClose={closeWriteModal}
        className="modal-login"
        overlayClassName="overlay-login"
      >
        <div className='div-cadastro'>

          <button className='modal-close-button' onClick={closeWriteModal}><FaTimes /></button>
          <h2 className="modal-login__title">Faça uma postagem</h2>
          <form className='modal-login__form'>

            <textarea
              className="tweet-content"
              placeholder="O que está acontecendo?"
              value={tweetText}
              onChange={handleTweetTextChange}



            ></textarea>
            {!tweetValid && <span className="form__message">Para postar é necessário escrever algo ou adicionar uma imagem</span>}

            {selectedImage ? (
              <div className='div-imagem-remove'>
                {/* <p>Imagem selecionada: {selectedImage.name}</p> */}

                <img src={imagePreview} alt="Imagem selecionada" className="image-preview" />
                <button className='remove-image-button' onClick={handleImageRemove}><FaTimes className='fa-times-remove-image' /></button>

              </div>
            ) : (
              <label htmlFor="tweet-image" className="upload-button">
                <FiUpload className="upload-icon" />
                Adicionar imagem
                <input
                  type="file"
                  id="tweet-image"
                  accept="image/*"
                  className="upload-input"
                  onChange={handleImageChange}
                />
              </label>
            )}

            <button
              type="submit"
              className='modal-login__button'
              onClick={handleTweetSubmit}
            >
              Tweetar</button>
          </form>


        </div>

      </Modal>
    </div>
  );
};

export default SearchBar;