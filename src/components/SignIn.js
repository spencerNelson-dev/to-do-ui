import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import { uriBase, userApi } from '../const'
import queryString from 'query-string'
import { Link as RLink } from 'react-router-dom'

//const ls = require('local-storage')

function SignIn(props) {
    //State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Context
    const { setLoggedIn, setToken } = useContext(AuthContext)

    const onChangeHandler = (event) => {

        let name = event.target.name

        switch (name) {
            case 'email':
                setEmail(event.target.value)
                break;

            case 'password':
                setPassword(event.target.value)
                break
            default:
                break;
        }

    }

    // email password sign in
    const onClickHandler = () => {

        let body = { email, password }

        // Post the email and password to the api
        // if an email is found and it matches the
        // password, it will return a json web token
        fetch(`${uriBase}${userApi}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Could not get user")
                }
                return httpResult.json()
            })
            .then(result => {

                // if a token was returned
                if (result.token !== '') {

                    setLoggedIn(true)
                    setToken(result.token)
                    window.localStorage.setItem("token", result.token)
                }
                props.history.push('/tasks')
            })
            .catch(error => {
                console.error(error.name, error.message)
            })
    }

    // oauth sign in
    useEffect((parsed) => {

        parsed = queryString.parseUrl(window.location.href)

        if (parsed.query.token) {

            setLoggedIn(true)
            setToken(parsed.query.token)
            window.localStorage.setItem("token", parsed.query.token)
            props.history.push('/tasks')
        }

        let localToken = window.localStorage.getItem("token")

        if (localToken !== "") {
            setLoggedIn(true)
            setToken(localToken)
        }

    }, [])

    return (
        <div>
            Email:
            <input type='email' name="email" onChange={onChangeHandler} value={email}></input><br />
            Password:
            <input type='password' name="password" onChange={onChangeHandler} value={password}></input><br />
            <button onClick={onClickHandler}>Log In</button><br /><br />

            <a href={`${uriBase}${userApi}/auth/google/login`}>
                <img src={`${uriBase}/img/google_login.png`} alt='Google Login' height='45' width='190'></img>
            </a>
            <br /><br />
            <a href={`${uriBase}${userApi}/auth/facebook/login`}>
                <img src={`${uriBase}/img/facebook_login.png`} alt='Facebook Login' height='45' width='190'></img>
                </a><br /><br />

            <RLink to='/tasks'>To Tasks</RLink><br /><br /><br />

            <a href={`http://localhost:5001/img/google_login.png`}>html</a>
            <br />

            <a href="https://www.termsfeed.com/privacy-policy/8f4f66fa4c830b22fc9a54a9b3601b26">Privacy Policy</a>
        </div>
    );
}

export default SignIn;