import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import {getAllUsers, createNewUser, deleteUser, updateUser} from '../fetchUtils'
import {Link as RLink} from 'react-router-dom'

import CheckBox from '@material-ui/core/Checkbox'

const CreateUser = (props) => {

    // state
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')


    // context
    const { setLoggedIn, token } = React.useContext(AuthContext)

    const clearUserState = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setCheckbox(false)
        setAdmin(false)
        setIsEdit(false)
        setEditId('')
    }

    const changeCheckBox = () => {
        setAdmin(!admin)
    }

    const onChangeHandler = (event) => {

        let name = event.target.name
        let value = event.target.value

        switch (name) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break;
        }

    }

    const onClickAdd = async () => {

        let newUser = {
            firstName,
            lastName,
            email,
            password,
            admin
        }

        await createNewUser(newUser, token)

        clearUserState()
        refresh()
    }

    const onClickEdit = async (event) => {

        console.log(users)

        let updatedUser = {
            firstName,
            lastName,
            email,
            password,
            admin
        }

        console.log(editId, updatedUser)

        await updateUser(editId, updatedUser, token)

        clearUserState()
        refresh()
    }

    const onUserEditClick = (event) => {

        let index = event.target.name

        let user = users[index]

        //console.log(index, user)

        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setAdmin(user.admin)
        setPassword(user.password)

        setIsEdit(true)
        setEditId(user._id)

    }

    const onUserDeleteClick = async (event) => {

        let index = event.target.name

        let user = users[index]

        await deleteUser(user, token)

        clearUserState()
        refresh()
    }

    const refresh = () => {


        getAllUsers(token)
        .then(users => {
            
            setUsers(users)
        })
    }

    useEffect( () => {

        refresh()
    }, [])

    const createButton = () => {

        if(!isEdit){
            return (
                <button onClick={onClickAdd}>Add New</button>
            )
        } else {
            return (
                <button onClick={onClickEdit}>Edit</button>
            )
        }

    }

    const changeCheckbox = (event) => {
        
        setCheckbox(!checkbox)
    }

    return (
        <div>
            Create New Account <br/>
            <div>
                    First Name:
                    <input type='text' name='firstName' onChange={onChangeHandler} value={firstName}></input><br />
                    Last Name:
                    <input type='text' name='lastName' onChange={onChangeHandler} value={lastName}></input><br />
                    Email:
                    <input type='email' name='email' onChange={onChangeHandler} value={email}></input><br/>
                    Password:
                    <input type='password' name='password' onChange={onChangeHandler} value={password}></input><br/>

                    <CheckBox checked={admin} onChange={changeCheckBox} value={admin}></CheckBox> Admin <br/>
                    {createButton()}        
            </div>

            <div>
                <br/><br/>
            <button onClick={() => { setLoggedIn(false) }}>LOGOUT</button><t></t>
            <RLink to='/tasks'>Tasks</RLink>
            <button onClick={refresh}>Refresh</button>
            <button onClick={clearUserState}>CLEAR FORM</button>
            </div>

            <div style={{float: 'left', textAlign: 'left'}}>
                <ul>
                    {
                        users.map( (value, index) => {

                            return(
                                <li key={index}>
                                    {`${value.email} || ${value.admin ? "Admin" : "Not admin"} ||`}
                                    <button onClick={onUserDeleteClick} name={index}>Delete</button>
                                    <button onClick={onUserEditClick} name={index}>Edit</button>
                                </li>
                            )
                            
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default CreateUser;
