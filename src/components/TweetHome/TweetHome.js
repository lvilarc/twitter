import React, { useState } from 'react';
import './TweetHome.css';



const TweetHome = ({ imageSrc, name, username, text, imageSrcTweet, timeElapsed }) => {



    return (
        <div className="Tweet">
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