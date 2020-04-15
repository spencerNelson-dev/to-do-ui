import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import { uriBase, userApi } from '../const'
import queryString from 'query-string'
import { Link as RLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

//const ls = require('local-storage')

function SignIn(props) {
    //State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Context
    const { loggedIn, setLoggedIn, setToken } = useContext(AuthContext)

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
    const onClickHandlerLogIn = () => {

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
                props.history.push(`/tasksList`)
            })
            .catch(error => {
                console.error(error.name, error.message)
            })
    }

    // oauth sign in and token sign in
    // we only want to run this once,
    // when to app first loads
    useEffect((parsed) => {

        // we look at the href on the window to see if a
        // token is there
        // if the user logged in through google or facebook
        // it would appear there
        parsed = queryString.parseUrl(window.location.href)

        //if the token is there
        if (parsed.query.token) {

            // we log the user in and
            // write the token to local storage
            setLoggedIn(true)
            setToken(parsed.query.token)
            window.localStorage.setItem("token", parsed.query.token)
            props.history.push('/tasksList')
        }


        // either way we we then look at the local
        // storage to see if there is already a token
        let localToken = window.localStorage.getItem("token")

        // if the token there we will log the user in
        // and set our state
        if (localToken) {
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
            <Button onClick={onClickHandlerLogIn}>Log In</Button>
            <Button component={RLink} to='/signup'>Sign Up!</Button>
            <br /><br />

            <a href={`${uriBase}${userApi}/auth/google/login`}>
                <img src={`${uriBase}/img/google_login.png`} alt='Google Login' height='45' width='190'></img>
            </a>
            <br /><br />
            <a href={`${uriBase}${userApi}/auth/facebook/login`}>
                <img src={`${uriBase}/img/facebook_login.png`} alt='Facebook Login' height='45' width='190'></img>
                </a><br /><br />

                {
                    loggedIn ? <RLink to='/tasksList'>To Tasks</RLink> : null
                }

            <br /><br /><br />
            <br />

            <a href="https://www.termsfeed.com/privacy-policy/8f4f66fa4c830b22fc9a54a9b3601b26">Privacy Policy</a>
        </div>
    );
}

export default SignIn;