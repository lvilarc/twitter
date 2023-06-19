import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaUser, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function Navbar() {


    const [isLoggeedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef();
    
    useEffect(() => {
        if (isDropdownOpen) {
            let handler = (e) => {
                if (!dropdownRef.current.contains(e.target)) {
                    setIsDropdownOpen(false);
                }
            };
    
            document.addEventListener("mousedown", handler);
    
            return() => {
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
    }

    const handleCadastrese = () => {
        setIsLoginModalOpen(false);
        setIsCadastroModalOpen(true);
    }

    const handleEntrar = () => {
        setIsCadastroModalOpen(false);
        setIsLoginModalOpen(true);

    }

    return (
        <nav className="navbar">
            <button className="navbar-title">Twitter</button>
            {!isLoggeedIn && <button className="login-button" onClick={openLoginModal}>Entrar</button>}
            {isLoggeedIn && <div className="avatar-button" ref={dropdownRef}>
                <div
                    className="avatar"
                    onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
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
            <Modal
                isOpen={isLoginModalOpen}
                onRequestClose={closeLoginModal}
                className="modal-login"
                overlayClassName="overlay-login"
            >
                <button className='modal-close-button' onClick={closeLoginModal}><FaTimes /></button>
                <h2 className="modal-login__title">Entrar</h2>
                <form className="modal-login__form" onSubmit={handleLogin}>
                    <label className="modal-login__label">
                        Email:
                        <input
                            className="modal-login__input"
                            type="email"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="modal-login__label">
                        Senha:
                        <input
                            className="modal-login__input"
                            type="password"
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="modal-login__button" type="submit">Entrar</button>
                </form>
                <p className="modal-login__message">
                    Ainda não tem cadastro? <button className="modal-login__link" onClick={handleCadastrese}>Cadastre-se</button>
                </p>
            </Modal>
            <Modal
                isOpen={isCadastroModalOpen}
                onRequestClose={closeCadastroModal}
                className="modal-login"
                overlayClassName="overlay-login"
            >
                <button className='modal-close-button' onClick={closeCadastroModal}><FaTimes /></button>
                <h2 className="modal-login__title">Cadastro</h2>
                <form className="modal-login__form" onSubmit={handleLogin}>
                    <label className="modal-login__label">
                        Nome:
                        <input
                            className="modal-login__input"
                            type="text"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="modal-login__label">
                        Email:
                        <input
                            className="modal-login__input"
                            type="email"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="modal-login__label">
                        Username:
                        <input
                            className="modal-login__input"
                            type="email"
                            // value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="modal-login__label">
                        Senha:
                        <input
                            className="modal-login__input"
                            type="password"
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="modal-login__button" type="submit">Criar conta</button>
                </form>
                <p className="modal-login__message">
                    Já possui cadastro? <button className="modal-login__link" onClick={handleEntrar}>Entrar</button>
                </p>
            </Modal>

        </nav>
    );
}

export default Navbar;
