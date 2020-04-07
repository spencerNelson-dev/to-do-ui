import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import {getAllUsers, createNewUser, deleteUser, updateUser, getAllTasks, deleteTask} from '../fetchUtils'
import {Link as RLink} from 'react-router-dom'
import {verifyToken} from '../jwtUtils'
import {JWT_KEY} from '../const'

import CheckBox from '@material-ui/core/Checkbox'

const CreateUser = (props) => {

    // state
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')


    // context
    const { setToken, token } = React.useContext(AuthContext)

    //clears all the textfields
    const clearUserState = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
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

        let updatedUser = {
            firstName,
            lastName,
            email,
            password,
            admin
        }

        await updateUser(editId, updatedUser, token)

        clearUserState()
        refresh()
    }

    const onUserEditClick = (event) => {

        let index = event.target.name

        let user = users[index]

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

    const onClickDelete = (event) => {

        console.log(event.target.value)

        // remove task from the db and rerender
        deleteTask(event.target.value)
        .then(response => {

           refresh()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const refresh = () => {

        verifyToken(token, JWT_KEY)
        .then(payload => {
            
            if(payload.user.admin){
                getAllUsers(token)
                .then(users => {
                    
                    setUsers(users)
                })

                getAllTasks(token)
                .then(tasks => {

                    setTasks(tasks || [])
                })
            } else{
                props.history.push('/')
            }
        })
        .catch(error => {
            console.log(error)
            props.history.push('/')
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
            <button onClick={() => { window.localStorage.removeItem("token"); setToken('') }}>LOGOUT</button>
            <RLink to='/tasks'>Tasks</RLink>
            <button onClick={refresh}>Refresh</button>
            <button onClick={clearUserState}>CLEAR FORM</button>
            </div>

            <div style={{float: 'left', textAlign: 'left'}}>
                <h2>Users:</h2>
                <ul>
                    {
                        users.map( (value, index) => {

                            return(
                                <li key={value._id}>
                                    {`${value.firstName} || ${value.email} || ${value.admin ? "Admin" : "Not admin"} ||`}
                                    <button onClick={onUserDeleteClick} name={index}>Delete</button>
                                    <button onClick={onUserEditClick} name={index}>Edit</button>
                                </li>
                            )
                            
                        })
                    }
                </ul>
                <h2>Tasks Without Users:</h2>
                <ul>
                    {
                        tasks.filter((task) => {
                            let foundTask = false

                            users.forEach((user) => {

                                if(task.userId === user._id){
                                    foundTask = true
                                }
                            })

                            if(!foundTask){
                                return task
                            }
                        }).map( (value, index) => {

                            return (
                                <li key={index}>
                                    {`${value.text} || ${value.userId}`}
                                    <button onClick={onClickDelete} value={value._id}>DELETE</button>
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
