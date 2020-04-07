import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { createNewUserNoToken } from '../fetchUtils'

function SignUp(props) {

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const onChangeHandler = (event) => {

        let newObj = { ...state }

        switch (event.target.id) {
            case "firstName":
                newObj.firstName = event.target.value
                break;
            case "lastName":
                newObj.lastName = event.target.value
                break;
            case "email":
                newObj.email = event.target.value
                break;
            case "password":
                newObj.password = event.target.value
                break;
            default:
                break;
        }

        setState(newObj)
    }

    const onClickHandler = () => {

        // look for any empty fields
        // tell the user to fill out all
        // fields if one is empty
        for (let prop in state) {
            if (state[prop] === '') {
                alert("Please fill out all fields.")
                return null
            }
        }

        //create the user object
        let user = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            admin: false
        }

        console.log(user)

        //if all are filled
        //create a new user
        createNewUserNoToken(user)
        .then(result => {

            alert("User Created!")
            
            // send the user to the sign in page
            props.history.push('/')
        })
        .catch(error => {
            alert("Creation failed")
        })



    }

    return (
        <div>
            <Paper elevation={3} style={{ padding: 16, margin: '25%' }}>
                <div>
                    <TextField required
                        id="firstName"
                        label="First Name"
                        value={state.firstName}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <TextField required
                        id="lastName"
                        label="Last Name"
                        value={state.lastName}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <TextField required
                        id="email"
                        label="Email"
                        value={state.email}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <TextField required
                        id="password"
                        label="Password"
                        type='password'
                        value={state.password}
                        onChange={onChangeHandler}
                    />
                </div>
                <br />
                <Button variant='contained' color='primary' onClick={onClickHandler}>Sign Up!</Button>
                <Button color='secondary' onClick={() => { props.history.push('/') }}>Cancel</Button>

            </Paper>

        </div>
    );
}

export default SignUp;