import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaUser, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import api from '../../service/api';
import axios from 'axios';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function Navbar() {


    const [isLoggeedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [password, setPassword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loadingCheckUsername, setLoadingCheckUsername] = useState(false);

    const dropdownRef = useRef();

    useEffect(() => {
        if (isDropdownOpen) {
            let handler = (e) => {
                if (!dropdownRef.current.contains(e.target)) {
                    setIsDropdownOpen(false);
                }
            };

            document.addEventListener("mousedown", handler);

            return () => {
                document.removeEventListener("mousedown", handler);
            }
        }

    });










    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de login aqui
        console.log('Email:', email);
        console.log('Senha:', password);
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        // Lógica de logout
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openCadastroModal = () => {
        setIsCadastroModalOpen(true);
    }

    const closeCadastroModal = () => {
        setIsCadastroModalOpen(false);
        setName('');
        setNameValid(true);
        setEmail('');
        setEmailValid(true);
        setUsername('');
        setUsernameAlreadyExists(false);
        setUsernameValid(true);
        setPassword('');
        // Falta setar algumas coisas
    }

    const handleCadastrese = () => {
        closeLoginModal();
        openCadastroModal();
    }

    const handleEntrar = () => {
        closeCadastroModal();
        openLoginModal();

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(true); // Reseta o estado de validade do email
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameValid(true); // Reseta o estado de validade do nome
    };

    const handleSubmit = (e) => {
        let responseData;
        const checkUsername = async () => {
            try {
                console.log(username)
                const response = await api.get(`/users/checkUsername/${username}`);
                responseData = response.data;

            } catch (error) {
                console.error('Erro ao buscar se usuario ja existe:', error);
            }
        };

        e.preventDefault();
        //Melhorar isso


        // Verificação de regex de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        checkUsername();

        setTimeout(function () {
            if (responseData == '1') {
                setUsernameAlreadyExists(true);
            }
            if (!emailRegex.test(email)) {
                setEmailValid(false);
            }
            if (name.length === 0) {
                setNameValid(false);
            }
            const regex = /^[a-zA-Z0-9_]{3,16}$/;
            const isValid = regex.test(username);
            if(!isValid) {
                setUsernameValid(isValid);
            }
            

            else {
                // Email válido, continuar com a lógica do envio do formulário
                console.log('Email válido:', email);
            }
        }, 100);
    }

    const handleUsernameChange = (e) => {
        const noSpaces = e.target.value.toLowerCase().replace(/\s/g, ''); 
        setUsername(noSpaces);
        setUsernameAlreadyExists(false); // Reseta a resposta da API ao digitar um novo username
        setUsernameValid(true);
        
    };

    return (
        <div className='div-direita'>
            {!isLoggeedIn && <div className='novo-no-twitter'>
                <h1 className='text-novo-no-twitter'>Acesse sua conta</h1>
                <button className='novo-no-twitter-entrar' onClick={openLoginModal}>Entrar</button>
                <button className='novo-no-twitter-criar-conta' onClick={openCadastroModal}>Criar conta</button>
            </div>}



            {isLoggeedIn && <div className="avatar-button" ref={dropdownRef}>
                <div
                    className="avatar"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <FaUser />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <ul>
                            <li>Editar perfil</li>
                            <li>Sair</li>
                        </ul>
                    </div>
                )}
            </div>}
            {/* Modal para se logar */}
            <Modal
                isOpen={isLoginModalOpen}
                onRequestClose={closeLoginModal}
                className="modal-login"
                overlayClassName="overlay-login"
            ><div className='div-cadastro'>
                    <button className='modal-close-button' onClick={closeLoginModal}><FaTimes /></button>
                    <h2 className="modal-login__title">Entrar</h2>
                    <form className="modal-login__form" onSubmit={handleLogin}>
                        {/* <label className="modal-login__label">
                            Email:
                            <input
                                className="modal-login__input"
                                type="email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label> */}
                        <div className="form__group field">
                            <input type="input" className="form__field" placeholder="Email" />
                            <label for="name" className="form__label">Email</label>
                        </div>
                        <div className="form__group field">
                            <input type="input" className="form__field" placeholder="Senha" />
                            <label for="name" className="form__label">Senha</label>
                        </div>
                        {/* <label className="modal-login__label">
                            Senha:
                            <input
                                className="modal-login__input"
                                type="password"
                                // value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label> */}
                        <button className="modal-login__button" type="submit">Entrar</button>
                    </form>
                    <p className="modal-login__message">
                        Ainda não tem cadastro? <button className="modal-login__link" onClick={handleCadastrese}>Cadastre-se</button>
                    </p>
                </div>

            </Modal>
            {/* Modal para se cadastrar */}
            <Modal
                isOpen={isCadastroModalOpen}
                onRequestClose={closeCadastroModal}
                className="modal-login"
                overlayClassName="overlay-login"
            >
                <div className='div-cadastro'>
                    <button className='modal-close-button' onClick={closeCadastroModal}><FaTimes /></button>
                    <h2 className="modal-login__title">Cadastro</h2>
                    <form className="modal-login__form" onSubmit={handleSubmit}>
                        {/* <label className="modal-login__label">
                            Nome:
                            <input
                                className="modal-login__input"
                                type="text"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label> */}
                        <div className="form__group field">
                            <input
                                type="input"
                                className={`form__field ${!nameValid ? 'form__field--invalid' : ''}`}
                                placeholder="Nome"
                                value={name}
                                onChange={handleNameChange}
                            />
                            {!nameValid && <span className="form__message">Campo em branco</span>}
                            <label for="name" className="form__label">Nome</label>
                        </div>
                        {/* <label className="modal-login__label">
                            Email:
                            <input
                                className="modal-login__input"
                                type="email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label> */}
                        <div className="form__group field">
                            <input
                                type="input"
                                className={`form__field ${!emailValid ? 'form__field--invalid' : ''}`}
                                placeholder="Email" value={email}
                                onChange={handleEmailChange}
                            />
                            {!emailValid && <span className="form__message">Email inválido</span>}
                            <label for="name" className="form__label">Email</label>
                        </div>
                        {/* <label className="modal-login__label">
                            Username:
                            <input
                                className="modal-login__input"
                                type="email"
                                // value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label> */}
                        <div className="form__group field">
                            <input type="input"
                                className="form__field"
                                placeholder="Nome de usuário"
                                value={username}
                                onChange={handleUsernameChange} />
                            {usernameAlreadyExists && <span className="form__message">Usuário já existe</span>}
                            {!usernameValid && <span className="form__message">Letras, números e underscore, 3-16 caracteres.</span>}
                            <label for="name" className="form__label">Nome de usuário</label>
                        </div>
                        {/* <label className="modal-login__label">
                            Senha:
                            <input
                                className="modal-login__input"
                                type="password"
                                // value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label> */}
                        <div className="form__group field">
                            <input type="input" className="form__field" placeholder="Senha" />
                            <label for="name" className="form__label">Senha</label>
                        </div>
                        <button className="modal-login__button" type="submit">Criar conta</button>
                    </form>
                    <p className="modal-login__message">
                        Já possui cadastro? <button className="modal-login__link" onClick={handleEntrar}>Entrar</button>
                    </p>
                </div>

            </Modal>


        </div>
    );
}

export default Navbar;
