import React, {useContext, useEffect} from 'react';
import {AuthContext} from './AuthContext'
import { verifyToken } from '../jwtUtils';

function GetToken(props) {

    const {setLoggedIn, setToken} = useContext(AuthContext)

    verifyToken(window.localStorage.getItem('token'))
    .then(result => {
        setLoggedIn(true)
        setToken(window.localStorage.getItem('token'))
    })


    return null
}

export default GetToken;