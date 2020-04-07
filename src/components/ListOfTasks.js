import React from 'react';
import Task from './Task'
import AddTask from './AddTask'
import { AuthContext } from './AuthContext'
import { TasksContext } from './TasksContext'
import { createNewTask, updateTask} from '../fetchUtils'

//const ls = require('local-storage')


const listStyle = {

    listStyleType: 'none',
}

const dateStyle = {

    listStyleType: 'none',
    backgroundColor: 'lightBlue'
}

export default function ListOfTasks(props) {
    //const [user, setUser] = React.useState('')
   // const [tasks, setTasks] = React.useState([])
    const [text, setText] = React.useState('')
    const [isEdit, setIsEdit] = React.useState(false)
    const [editId, setEditId] = React.useState('')

    const { setLoggedIn, user, } = React.useContext(AuthContext)

    const {tasks, setTasks} = React.useContext(TasksContext)

    const onClickAdd = (event) => {

        // check to see if the task is empty
        // if it is, send an alert
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

            // copy our current tasks state
            let updatedArray = [...tasks]

            //push our added task
            updatedArray.push(result)

            //set our state
            setTasks(updatedArray)
        })

        //clear text field
        setText('')
    }

    const onClickEdit = () => {

        // return the view to the add task
        // state
        setIsEdit(false)

        if (editId !== '') {

            // update task in db
            updateTask(editId, text)
                .then(result => {

                    // copy the state
                    let updatedTasks = [...tasks]

                    // look for the element with the
                    // id that was edited
                    // and change the text
                    for(let element of tasks){
                        if(element._id === editId){
                            element.text = text
                        }
                    }

                    // set state with updated tasks
                    setTasks(updatedTasks)

                    // clear the textbox
                    setText('')

                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("Cannot Edit")
        }
    }

    const tasksToDisplayArray = (tasks) => {
        // here we reduce our tasks array, pulling out unique dates
        // and making them their own items in the display array
        // later with our map we will return the date
        // as its own <li>

        return tasks.reduce((displayArr, currentTask) => {

            // if the date is not the previous date
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

    let currentDate = new Date()

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
                    isEdit={isEdit} setIsEdit={setIsEdit}
                    onClickEdit={onClickEdit} >
                </AddTask>
            </div>

            <button onClick={() => { window.localStorage.removeItem("token"); setLoggedIn(false) }}>LOGOUT</button>
            <br/><br/>
            <div>
                {
                    user.admin ? (
                        <button onClick={() => { props.history.push('/create-user')}}>Admin Page</button>
                    ) : (null)
                }
            </div>
            
            
        </div>
    )
}