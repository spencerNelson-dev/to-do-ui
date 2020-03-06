import React from 'react';
import Task from './Task'
import AddTask from './AddTask'
import {uriBase, currentApi} from '../const'

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

export default function ListOfTasks() {
    const [tasks, setTasks] = React.useState([])

    const [text, setText] = React.useState('')

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

    const onClickDelete = (index, event)=> {

        console.log(index)

        let removeTask = tasks[index]

        fetch(`${uriBase}${currentApi}/${removeTask._id}`, {
            method: "DELETE",
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
            
            refresh()
        })
        .catch(error => {
            console.log(error)
        })

        // let data = [...tasks]

        // data.splice(index, 1)

        // setTasks(data)
    }

    const onClickAdd = () => {

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

        // let data = [...tasks]

        // data.push(newTask)

        // console.log(data)

        // setTasks(data)

        // setText('')
    }

    React.useEffect(() => {

        refresh()
    }, [])

    return(
        <div>
      <ul>
        {
          tasks.map((task, index) => {
            return (
              <li key={index}>
                <Task task={task} onClickDelete={(event) => {onClickDelete(index,event)}} ></Task> 
              </li>
            )
          })
        }
      </ul>
      <div>
          <AddTask text={text} setText={setText} onClickAdd={onClickAdd} ></AddTask>
      </div>
        </div>
    )
}