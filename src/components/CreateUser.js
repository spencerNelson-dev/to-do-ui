import React, { useState } from 'react';
import { AuthContext } from './AuthContext'
import { createNewUser, deleteUser, updateUser, deleteTask } from '../fetchUtils'
import { Link as RLink } from 'react-router-dom'
import { TasksContext } from './TasksContext'

import CheckBox from '@material-ui/core/Checkbox'

const CreateUser = (props) => {

    /* State and Context */

    //#region 

    // state for our textfields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)

    // state for our edit buttons
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')

    // context
    const { setToken, token, setLoggedIn, setUser } = React.useContext(AuthContext)
    const { tasks, setTasks, users, setUsers, allTasks, setAllTasks } = React.useContext(TasksContext)

    //#endregion

    /* 
    Functions for our text fields
    and other form functions
    */

    //#region
    // clear the text feilds and edit state
    const clearUserState = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setAdmin(false)
        setIsEdit(false)
        setEditId('')
    }

    // update our fields as we type
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

    // this function updates our fields with
    // information of the user we want to edit
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

    // this function displays either the
    // add button or edit button depending on
    // the state of isEdit
    const createButton = () => {

        if (!isEdit) {
            return (
                <button onClick={onClickAdd}>Add New</button>
            )
        } else {
            return (
                <button onClick={onClickEdit}>Edit</button>
            )
        }

    }
    //#endregion

    /* 
    Functions that make calls to our api
    Creating, updating or deleteing users
    */

    //#region 

    //CREATE a user
    const onClickAdd = () => {

        let newUser = {
            firstName,
            lastName,
            email,
            password,
            admin
        }

        createNewUser(newUser, token)
            .then(result => {

                // copy state
                let updatedUsers = [...users]

                // push on our new user
                updatedUsers.push(result)

                // update state
                setUsers(updatedUsers)
            })

        clearUserState()
    }

    //EDIT user
    const onClickEdit = (event) => {

        let updatedUser = {
            firstName,
            lastName,
            email,
            password,
            admin
        }

        updateUser(editId, updatedUser, token)
            .then(result => {

                // if we get the response
                // that one was modified
                if (result.nModified === 1) {

                    // copy our state
                    let updatedUsers = [...users]

                    // loop through our users
                    for (let element of updatedUsers) {

                        // find the element with matching id
                        if (element._id === editId) {

                            // replace the props
                            for (let prop in element) {
                                element[prop] = updatedUser[prop]
                            }

                            // update state
                            setUsers(updatedUsers)
                        }
                    }
                }
            })

        clearUserState()
    }

    //DELETE user
    const onUserDeleteClick = (event) => {


        // the name our of event target is
        // the index of the user in the 
        // users array
        let index = event.target.name

        // get the user we want to delete
        let deletedUser = users[index]

        // send the request to the server
        deleteUser(deletedUser, token)
            .then(result => {

                // if one was deleted
                if (result.deletedCount === 1) {

                    //copy state
                    let updatedUsers = [...users]

                    //remove it from the tasks array
                    // using our index we saved from before
                    updatedUsers.splice(index, 1)

                    //set the state
                    setUsers(updatedUsers)
                }
            })

    }

    //#endregion

    /*
    Functions for our list of unclaimed tasks
    */

    //#region 

    // DELETE task
    const onClickDeleteTask = (event) => {

        let id = event.target.value

        // remove task from the db and rerender
        deleteTask(id)
            .then(response => {

                if (response.deletedCount === 1) {

                    // copy our state
                    let updateAllTasks = [...allTasks]

                    let index

                    // find the index of the task we want to remove
                    for (let element of updateAllTasks) {
                        if (element._id === id) {
                            index = updateAllTasks.indexOf(element)
                        }
                    }

                    // remove the task from the array
                    updateAllTasks.splice(index, 1)

                    // set state
                    setAllTasks(updateAllTasks)
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    //#endregion

    /* What we render */
    return (
        <div>
            Create New Account <br />
            <div>
                First Name:
                <input type='text' name='firstName' onChange={onChangeHandler} value={firstName}></input><br />
                    Last Name:
                    <input type='text' name='lastName' onChange={onChangeHandler} value={lastName}></input><br />
                    Email:
                    <input type='email' name='email' onChange={onChangeHandler} value={email}></input><br />
                    Password:
                    <input type='password' name='password' onChange={onChangeHandler} value={password}></input><br />

                <CheckBox checked={admin} onChange={() => { setAdmin(!admin) }} value={admin}></CheckBox> Admin <br />
                {createButton()}
            </div>

            <div>
                <br /><br />
                <button onClick={() => { window.localStorage.removeItem("token"); setToken(''); setLoggedIn(false); setTasks([]); setUser({}) }}>LOGOUT</button>
                <RLink to='/tasks'>Tasks</RLink>
                <button onClick={clearUserState}>CLEAR FORM</button>
            </div>

            <div style={{ float: 'left', textAlign: 'left' }}>
                <h2>Users:</h2>
                <ul>
                    {
                        users.map((value, index) => {

                            return (
                                <li key={value._id}>
                                    {`${value._id} ||${value.firstName} || ${value.email} || ${value.admin ? "Admin" : "Not admin"} ||`}
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
                        allTasks.filter((task) => {
                            let foundTask = false

                            users.forEach((user) => {

                                if (task.userId === user._id) {
                                    foundTask = true
                                }
                            })

                            if (!foundTask) {
                                return task
                            }
                        }).map((value, index) => {

                            return (
                                <li key={index}>
                                    {`${value.text} || ${value.userId}`}
                                    <button onClick={onClickDeleteTask} value={value._id}>DELETE</button>
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
