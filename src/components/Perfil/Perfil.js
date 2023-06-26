import React, { useEffect, useState } from 'react';
import './Perfil.css';
import { FaTimes, FaCamera } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const Perfil = ({ user, imageSrc, name, username }) => {

    const [isEditPerfilModalOpen, setIsEditPerfilModalOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [nameValue, setNameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');


    useEffect(() => {
        setNameValue(user.name);
        setUsernameValue(user.username);
    }, [])

    const openEditPerfilModal = () => {
        setIsEditPerfilModalOpen(true);
    }

    const closeEditPerfilModal = () => {
        setSelectedImage(null)
        setImagePreview('');
        setNameValue(user.name);
        setUsernameValue(user.username);
        setIsEditPerfilModalOpen(false);
    }

    const handleUsernameValueChange = (event) => {
        let value = event.target.value.toLowerCase()
        value = value.replace(/\s/g, '');
        setUsernameValue(value);
    }
    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }

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

    return (
        <div className="Perfil">
            <div className='div-background-perfil'></div>
            <div className="perfil-avatar-container">

                <img src={imageSrc} className="perfil-avatar" />


            </div>
            <h2 className='perfil-h2'>{name}</h2>
            <a className="perfil-username">{username}</a>
            <button className='editar-meuperfil' onClick={openEditPerfilModal}>Editar</button>
            <Modal
                isOpen={isEditPerfilModalOpen}
                onRequestClose={closeEditPerfilModal}
                className="modal-login"
                overlayClassName="overlay-login"
            >
                <div className='div-cadastro'>

                    <button className='modal-close-button' onClick={closeEditPerfilModal}><FaTimes /></button>
                    <h2 className="modal-login__title">Editar perfil</h2>
                    <form className='modal-login__form'>


                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Email"
                                id="name-edit-perfil"
                                onChange={handleNameValueChange}
                                value={nameValue}
                                style={{ marginBottom: '20px' }}
                            />
                            <label htmlFor="name-edit-perfil" className="form__label">Nome</label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Email"
                                id="name-edit-perfil"
                                onChange={handleUsernameValueChange}
                                value={usernameValue}
                                style={{ marginBottom: '20px' }}
                            />
                            <label htmlFor="name-edit-perfil" className="form__label">Username</label>
                        </div>
                        <h2 className='foto-de-perfil-label'>Foto de perfil</h2>
                        {selectedImage ? (
                            <div className='div-imagem-remove'>
                                {/* <p>Imagem selecionada: {selectedImage.name}</p> */}

                                <img src={imagePreview} alt="Imagem selecionada" className="image-preview-edit-perfil" />
                                <button className='remove-image-button' onClick={handleImageRemove}><FaTimes className='fa-times-remove-image' /></button>

                            </div>
                        ) : (
                            // <label htmlFor="tweet-image" className="upload-button">
                            //     <FiUpload className="upload-icon" />
                            //     Adicionar imagem
                            //     <input
                            //         type="file"
                            //         id="tweet-image"
                            //         accept="image/*"
                            //         className="upload-input"
                            //         onChange={handleImageChange}
                            //     />
                            // </label>
                            <div className="circular-input">

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="input"
                                    onChange={handleImageChange}
                                    id="file-input-editperfil"
                                />
                                <label htmlFor="file-input-editperfil">
                                    <div className="icon-container">
                                        <FaCamera className="icon" />
                                    </div>
                                </label>
                            </div>

                        )}


                       
                        <button
                            type="submit"
                            className='modal-login__button'
                        // onClick={handleTweetSubmit}
                        >
                            Salvar</button>
                    </form>


                </div>

            </Modal>


        </div>



    );
};

export default Perfil;