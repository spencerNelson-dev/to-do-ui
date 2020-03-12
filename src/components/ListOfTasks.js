import React from 'react';
import Task from './Task'
import AddTask from './AddTask'
import { uriBase, currentApi } from '../const'
import {Link} from 'react-router-dom'
import {AuthContext} from './AuthContext'

const DUMMY_DATA = [
    {
        date: (new Date()).toLocaleDateString(),
        text: "My first task",
        isComplete: false
    },
    {
        date: (new Date()).toLocaleDateString(),
        text: "My second task should start completed",
        isComplete: true
    }

]

const listStyle = {

    listStyleType: 'none',

}

export default function ListOfTasks() {
    const [tasks, setTasks] = React.useState([])
    const [text, setText] = React.useState('')
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')

    const {setLoggedIn} = React.useContext(AuthContext)

    const refresh = () => {

        fetch(`${uriBase}${currentApi}`, {
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
                    isComplete: false
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

        if (editId !== ''){

            fetch(`${uriBase}${currentApi}/${editId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"text": text})
            })
            .then(httpResult => {
                if(!httpResult.ok){
                    throw new Error("Could not update with edit")
                }

                return httpResult
            })
            .then(result => {

                refresh()
                setText('')
            })
            .catch(error =>{
                console.log(error)
            })
        } else {
            alert("Cannot Edit")
        } 
    }


    React.useEffect(() => {

        refresh()
    }, [])

    return (
        <div>
            <div >
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
            </div>
            <div>
                <AddTask text={text} setText={setText}
                    onClickAdd={onClickAdd}
                    refresh={refresh}
                    isEdit={isEdit} setIsEdit={setIsEdit}
                    onClickEdit={onClickEdit} >
                </AddTask>
            </div>
            <button onClick={() => {setLoggedIn(false)}}>LOGOUT</button>
        </div>
    )
}