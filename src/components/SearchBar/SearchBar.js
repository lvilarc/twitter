import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FiEdit, FiUpload, FiX  } from 'react-icons/fi';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const SearchBar = ({ onChange, onSearch }) => {

  
  const [aba, setAba] = useState('Explorar');
  const [tweetText, setTweetText] = useState('');

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');




  const handleTweetTextChange = (event) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setTweetText(value);
    }
  };

  const handleImageChange = (event) => {
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
    setIsWriteModalOpen(true);
  };

  const closeWriteModal = () => {
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

            {selectedImage ? (
              <div className='div-imagem-remove'>
                {/* <p>Imagem selecionada: {selectedImage.name}</p> */}
               
                <img src={imagePreview} alt="Imagem selecionada" className="image-preview" />
                <button className='remove-image-button' onClick={handleImageRemove}><FaTimes className='fa-times-remove-image'/></button>
                
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

            <button type="submit" className='modal-login__button'>Tweetar</button>
          </form>


        </div>

      </Modal>
    </div>
  );
};

export default SearchBar;