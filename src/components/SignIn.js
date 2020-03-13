import React, { useContext, useState } from 'react';
import { Link as RLink, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { uriBase, userApi } from '../const'
import Title from './Title'

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

    const onClickHandler = () => {

        let body = { email, password }

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
            console.log("httpresult")
            return httpResult.json()
        })
        .then(result => {
            if(result.token !== ''){
                setLoggedIn(true)
                setToken(result.token)
            } 
            props.history.push('/tasks')
        })
        .catch(error => {
            console.error(error.name, error.message)
        })
    }

    return (
        <div>
            Email:
            <input type='email' name="email" onChange={onChangeHandler} value={email}></input><br />
            Password:
            <input type='password' name="password" onChange={onChangeHandler} value={password}></input><br />
            <button onClick={onClickHandler}>Log In</button><br />
        </div>
    );
}

export default SignIn;