import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import { uriBase, currentApi, JWT_KEY, userApi } from '../const'
import {getAllUsers} from '../fetchUtils'
import {Link as RLink} from 'react-router-dom'

const CreateUser = (props) => {

    // state
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [admin] = useState(props.user)
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')


    // context
    const { setLoggedIn, token } = React.useContext(AuthContext)


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

    const onClickAdd = () => {

    }

    const onClickEdit = () => {

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
            Create New Account
            <div>
                    First Name:
                    <input type='text' name='firstName' onChange={onChangeHandler} value={firstName}></input><br />
                    Last Name:
                    <input type='text' name='lastName' onChange={onChangeHandler} value={lastName}></input><br />
                    Email:
                    <input type='email' name='email' onChange={onChangeHandler} value={email}></input><br/>
                    Password:
                    <input type='password' name='password' onChange={onChangeHandler} value={password}></input><br/>

                    <input type='checkbox' name="admin" onChange={changeCheckbox}></input> Admin <br/>
                    {createButton()}        
            </div>
            <div style={{float: 'left', textAlign: 'left'}}>
                <ul>
                    {
                        users.map( (value, index) => {

                            return(
                                <li key={index}>
                                    {`${value.email}`}
                                    <button>Delete</button>
                                    <button onClick={() => {setIsEdit(true)}}>Edit</button>
                                    </li>
                            )
                            
                        })
                    }
                </ul>
            </div>
            <button onClick={() => { setLoggedIn(false) }}>LOGOUT</button>
            <RLink to='/tasks'>Tasks</RLink>
        </div>
    );
};

export default CreateUser;
