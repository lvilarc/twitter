import React from 'react';
import './Perfil.css';

const Perfil = ({ imageSrc, name, username, text, imageSrcTweet, timeElapsed }) => {
    return (
        <div className="Perfil">
            <div className="perfil-avatar-container">
                <img src={imageSrc} className="perfil-avatar" />
            </div>
           <h2 className='perfil-h2'>{name}</h2>
           <a className="perfil-username">{username}</a>

        </div>



    );
};

export default Perfil;