import React, { useEffect, useState } from 'react';
import './UserPerfil.css';
import { FaTimes, FaCamera } from 'react-icons/fa';

import api from '../../service/api';


import baseURL from '../../service/baseURL';



const UserPerfil = ({ photo, name, username }) => {


  

    return (
        <div className="Perfil">
            <div className='div-background-perfil'></div>
            <div className="perfil-avatar-container">

                <img src={photo} className="perfil-avatar" />


            </div>
            <h2 className='perfil-h2'>{name}</h2>
            <a className="perfil-username">{`@${username}`}</a>
            {/* <button className='editar-meuperfil' >Seguir</button> */}
           


        </div>



    );
};

export default UserPerfil;