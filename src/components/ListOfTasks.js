import React from 'react';
import Task from './Task'
import AddTask from './AddTask'
import {  JWT_KEY } from '../const'
import { AuthContext } from './AuthContext'
import { verifyToken } from '../jwtUtils'
import { getTasksByUserId , createNewTask, updateTask} from '../fetchUtils'

const ls = require('local-storage')


const listStyle = {

    listStyleType: 'none',
}

const dateStyle = {

    listStyleType: 'none',
    backgroundColor: 'lightBlue'
}

export default function ListOfTasks(props) {
    const [user, setUser] = React.useState('')
    const [tasks, setTasks] = React.useState([])
    const [text, setText] = React.useState('')
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')

    const { setLoggedIn, token, admin, setAdmin } = React.useContext(AuthContext)

    const refresh = () => {

        // Verify Token
        verifyToken(ls.get("token"), JWT_KEY)
            .then(payload => {

                return payload.user
            })
            .then(user => {

                // set user
                setUser(user)
                setAdmin(user.admin)

                // get tasks by user id
                getTasksByUserId(user)
                .then(tasks => {
                    setTasks(tasks)
                })

            }) // end of verify token
            .catch(error => {

                console.log(error)
                props.history.push('/')
            })
    }

    const onClickAdd = (event) => {

        // check to see if the task is empty
        if (text === '') {

            return (
                alert("Task cannot be empty")
            )
        }

        // construct the new task object
        let newTask = {
            date: new Date(),
            text: text,
            isComplete: false,
            userId: user._id
        }

        // add the object to the database and refresh
        createNewTask(newTask)
        .then(result => {
            refresh()
        })

        //clear text field
        setText('')
    }

    const onClickEdit = () => {

        setIsEdit(false)

        if (editId !== '') {

            // update task in db
            updateTask(editId, text)
                .then(result => {

                    // update the view
                    refresh()
                    setText('')
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("Cannot Edit")
        }
    }

    React.useEffect(() => {

        refresh()
    }, [])

    const tasksToDisplayArray = (tasks) => {
        // here we reduce our tasks array, pulling out unique dates
        // and making them their own items in the display array
        // later with our map we will return the date
        // as its own li

        return tasks.reduce((displayArr, currentTask) => {

            // if the date is not
            if (new Date(currentTask.date).toLocaleDateString() !==
                new Date(currentDate).toLocaleDateString()) {

                // store the current date
                currentDate = currentTask.date

                // push the date and then push the task
                displayArr.push(currentDate)
                displayArr.push(currentTask)
            } else {
                // if the date is the same as the previous task
                // then just push the task
                displayArr.push(currentTask)
            }

            return displayArr

        }, []) // end of reduce()
        .map((task, index) => {
            // This map function will translate our
            // display array to li items

            return (

                // if the text exists then we know that the
                // item is not just a date and we will display
                // all the task information
                task.text ? (
                    <li style={listStyle} key={index}>
                        <Task task={task}
                            refresh={refresh}
                            setIsEdit={setIsEdit}
                            setText={setText}
                            setEditId={setEditId}></Task>
                    </li>
                    // if the item has no text property then
                    // we will just display the date.
                ) : (
                        <li style={dateStyle} key={index}>
                            {`***** ${new Date(task).toLocaleDateString()} *****`}
                        </li>
                    )
            )
        }) // end of map()
    } // end of tasksToDisplayArr()

    let currentDate = new Date(0)

    return (
        <div>
            <h4>{`${user.firstName} ${user.lastName}'s Tasks:`}</h4>

            <div >
                <ul style={{ padding: 0 }}>
                    {
                        tasksToDisplayArray(tasks)
                    }
                </ul>
            </div>

            <div>
                <AddTask text={text} setText={setText}
                    onClickAdd={onClickAdd}
                    refresh={refresh}
                    isEdit={isEdit} setIsEdit={setIsEdit}
                    onClickEdit={onClickEdit} >
                </AddTask>
            </div>

            <button onClick={() => { setLoggedIn(false) }}>LOGOUT</button>
            <br/><br/>
            <div>
                {
                    admin ? (
                        <button onClick={() => { props.history.push('/create-user')}}>Admin Page</button>
                    ) : (null)
                }
            </div>
            
            
        </div>
    )
}