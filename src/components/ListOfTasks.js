import React from 'react';
import Task from './Task'
import AddTask from './AddTask'
import Title from './Title'
import DateList from './DateList'
import { uriBase, currentApi, JWT_KEY } from '../const'
import { AuthContext } from './AuthContext'
import { verifyToken } from '../jwtUtils'


const listStyle = {

    listStyleType: 'none',
}

const dateStyle = {

    listStyleType: 'none',
    backgroundColor: 'lightBlue'
}

export default function ListOfTasks() {
    const [user, setUser] = React.useState('')
    const [tasks, setTasks] = React.useState([])
    const [text, setText] = React.useState('')
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')

    const { setLoggedIn, token } = React.useContext(AuthContext)

    const refresh = () => {

        // Verify Token
        verifyToken(token, JWT_KEY)
            .then(payload => {
                return payload.user
            })
            .then(result => {
                setUser(result)

                // GET all the tasks
                fetch(`${uriBase}${currentApi}/${result._id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then(httpResult => {
                        if (!httpResult.ok) {
                            throw new Error("Bad response")
                        }

                        return httpResult.json()
                    })
                    .then(response => {

                        setTasks(response)
                    })
                    .catch(error => {

                        console.log(error)
                    })

            }) // end of verify token
            .catch(error => {

                console.log(error)
            })
    }

    const onClickAdd = (event) => {

        // check to see if the task is empty
        if (text === '') {

            return (
                alert("Task cannot be empty")
            )
        }

        let newTask = {
            date: new Date(),
            text: text,
            isComplete: false,
            userId: user._id
        }

        fetch(`${uriBase}${currentApi}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask)
        })
            .then(httpResult => {
                if (!httpResult.ok) {
                    throw new Error("Bad response")
                }

                return httpResult.json()
            })
            .then(response => {

                refresh()
            })
            .catch(error => {
                console.log(error)
            })

        //clear text field
        setText('')
    }

    const onClickEdit = () => {

        setIsEdit(false)

        if (editId !== '') {

            fetch(`${uriBase}${currentApi}/${editId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "text": text })
            })
                .then(httpResult => {
                    if (!httpResult.ok) {
                        throw new Error("Could not update with edit")
                    }

                    return httpResult
                })
                .then(result => {

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

    let currentDate = new Date(0)

    return (
        <div>
            <h4>{`${user.firstName} ${user.lastName}'s Tasks:`}</h4>
            <div >
                <ul style={{padding: 0}}>
                    {
                        tasks.reduce((accumlator, currentValue) => {
                            // here we reduce our tasks array, pulling out unique dates
                            // and making them their own tasks
                            // later with our map will will return the date
                            // as its own li
                            if(new Date(currentValue.date).toLocaleDateString() !==
                               new Date(currentDate).toLocaleDateString())
                            {
                                currentDate = currentValue.date
                                accumlator.push(currentDate)
                                accumlator.push(currentValue)
                            } else{
                                accumlator.push(currentValue)
                            }
                            return accumlator

                        },[]).map((task, index) => {

                            return (

                                task.text ? (
                                <li style={listStyle} key={index}>
                                    <Task task={task}
                                        refresh={refresh}
                                        setIsEdit={setIsEdit}
                                        setText={setText}
                                        setEditId={setEditId}></Task>
                                </li>
                                ) : (

                                    <li style={dateStyle} key={index}>
                                        {`***** ${ new Date(task).toLocaleDateString()} *****`}
                                        </li>
                                )
                            )
                        })
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
        </div>
    )
}

/* 
                <ul >
                    {
                        tasks.map((task, index) => {

                            return (

                                <li style={listStyle} key={index}>
                                    <Task task={task}
                                        refresh={refresh}
                                        setIsEdit={setIsEdit}
                                        setText={setText}
                                        setEditId={setEditId}></Task>
                                </li>
                            )
                        })
                    }
                </ul>
*/