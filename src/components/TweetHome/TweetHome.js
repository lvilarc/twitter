import React, { useEffect, useState } from 'react';
import './TweetHome.css';
import api from '../../service/api';



const TweetHome = ({ setShowUserPerfil, setTitle, indexTweets, user, setShowMyPerfil, getUser, changePageToUserPerfil, id, setUserPerfil, imageSrc, name, username, text, imageSrcTweet, timeElapsed }) => {





    const handleClick = () => {
        // console.log('id: ' + id);
        // console.log('userid: ' + user.id)
        if (user && id == user.id) {
          
            setShowMyPerfil(true);
            setTitle("Meu perfil");
        
            
            window.scrollTo({
                top: 0,
                // behavior: 'smooth' // Adicione 'smooth' para uma animação de rolagem suave
            });
            // setTimeout(()=> {
            //     indexTweetsUser();
            // }, 100)
            


        }
        else {
            getUser(id);
            // setShowUserPerfil(true);
            
            window.scrollTo({
                top: 0,
                // behavior: 'smooth' // Adicione 'smooth' para uma animação de rolagem suave
            });
            changePageToUserPerfil();
            // Logica para ir para o Perfil do usuario
        }


    }


    return (
        <div className="Tweet" onClick={handleClick}>
            <div className="tweet-avatar-container">
                <img src={imageSrc} className="tweet-avatar" />
            </div>
            <div className="tweet-info">
                <div>
                    <a className="tweet-name">{name}</a>
                    <a className="tweet-username">{username}</a>
                    <a className="tweet-username">{'· ' + timeElapsed}</a>
                </div>

                <a className="tweet-text">{text}</a>
                <img src={imageSrcTweet} className='tweet-image' />

            </div>
        </div>



    );
};

export default TweetHome;