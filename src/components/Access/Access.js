import { useState, useEffect, useRef } from 'react';
import './Access.css';
import { FaUser, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import api from '../../service/api';
import axios from 'axios';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function Access() {


    const [isLoggeedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');


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

    const createUser = async (newUser) => {
        try {
            const response = await api.post('/users', newUser);
            console.log(response.data); // Aqui você pode tratar a resposta da API
        } catch (error) {
            console.error(error);
        }
    }










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
        setEmailLogin('');
        setPasswordLogin('');
    };

    const openCadastroModal = () => {
        setIsCadastroModalOpen(true);
    }

    const closeCadastroModal = () => {
        setIsCadastroModalOpen(false);
        setName('');
        setNameValid(true);
        setEmail('');
        setEmailAlreadyExists(false);
        setEmailValid(true);
        setUsername('');
        setUsernameAlreadyExists(false);
        setUsernameValid(true);
        setPassword('');
        setPasswordValid(true);
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
        setEmailAlreadyExists(false);
    };

    const handleEmailLoginChange = (e) => {
        setEmailLogin(e.target.value);
    };


    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameValid(true); // Reseta o estado de validade do nome
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.replace(/\s/g, ''));
        setPasswordValid(true); // Reseta o estado de validade do nome
    };

    const handlePasswordLoginChange = (e) => {
        setPasswordLogin(e.target.value.replace(/\s/g, ''));
    };

    const handleUsernameChange = (e) => {
        const noSpaces = e.target.value.toLowerCase().replace(/\s/g, '');
        setUsername(noSpaces);
        setUsernameAlreadyExists(false); // Reseta a resposta da API ao digitar um novo username
        setUsernameValid(true);

    };

    const handleSubmit = (e) => {
        let resDataCheckUsername;
        let resDataCheckEmail;
        let formIsValid = true;
        const checkUsername = async () => {
            try {
                const response = await api.get(`/users/checkUsername/${username}`);
                resDataCheckUsername = response.data;

            } catch (error) {
                console.error('Erro ao buscar se usuario ja existe:', error);
            }
        };
        const checkEmail = async () => {
            try {
                const response = await api.post('/user/checkEmail', {
                    email: email
                });
                resDataCheckEmail = response.data;

            } catch (error) {
                console.error('Erro ao buscar se usuario ja existe:', error);
            }
        };

        e.preventDefault();
        //Melhorar isso


        // Verificação de regex de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        checkUsername();
        checkEmail();

        setTimeout(function () {
            if (resDataCheckUsername == '0') {

            }
            else if (resDataCheckUsername == '1') {
                setUsernameAlreadyExists(true);
                formIsValid = false;
            }
            else {
                formIsValid = false;
            }
            if (resDataCheckEmail == '0') {

            }
            else if (resDataCheckEmail == '1') {
                setEmailAlreadyExists(true);
                formIsValid = false;
            }
            else {
                formIsValid = false;
            }

            if (!emailRegex.test(email)) {
                setEmailValid(false);
                formIsValid = false;
            }
            if (name.length === 0) {
                setNameValid(false);
                formIsValid = false;
            }
            const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
            const usernameisvalid = usernameRegex.test(username);
            if (!usernameisvalid) {
                setUsernameValid(usernameisvalid);
                formIsValid = false;
            }
            const passwordRegex = /^.{5,16}$/;
            const passwordisvalid = passwordRegex.test(password);
            if (!passwordisvalid) {
                setPasswordValid(passwordisvalid);
                formIsValid = false;
            }

            // Confirmação final para enviar para chamar a api
            if (formIsValid) {
                const newUser = {
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                };
                createUser(newUser);
            }
        }, 100);
    }



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
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Email"
                                id="email-entrar"
                                onChange={handleEmailLoginChange}
                                value={emailLogin}
                            />
                            <label htmlFor="email-entrar" className="form__label">Email</label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="password"
                                className="form__field"
                                placeholder="Senha"
                                id="password-entrar"
                                onChange={handlePasswordLoginChange}
                                value={passwordLogin}
                            />
                            <label htmlFor="password-entrar" className="form__label">Senha</label>
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
                                id="name-cadastro"
                            />
                            {!nameValid && <span className="form__message">Campo em branco</span>}
                            <label htmlFor="name-cadastro" className="form__label">Nome</label>
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
                                id="email-cadastro"
                            />
                            {emailAlreadyExists && <span className="form__message">Email já foi usado</span>}
                            {!emailValid && <span className="form__message">Email inválido</span>}
                            <label htmlFor='email-cadastro' className="form__label">Email</label>
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
                                onChange={handleUsernameChange}
                                id="username-cadastro"
                            />
                            {usernameAlreadyExists && <span className="form__message">Usuário já existe</span>}
                            {!usernameValid && <span className="form__message">Letras, números e underscore, 3-16 caracteres.</span>}
                            <label htmlFor='username-cadastro' className="form__label">Nome de usuário</label>
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
                            <input
                                type="password"
                                className="form__field"
                                placeholder="Senha"
                                value={password}
                                onChange={handlePasswordChange}
                                id="password-cadastro"
                            />
                            {!passwordValid && <span className="form__message">Senha de 5-16 caracteres.</span>}
                            <label htmlFor='password-cadastro' className="form__label">Senha</label>
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

export default Access;
