import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getTasksByUserId, getAllUsers, getAllTasks } from '../fetchUtils'

const TasksContext = React.createContext({})

const TasksProvider = (props) => {

    // set our state:
    // we want our components to see what
    // tasks are available
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [allTasks, setAllTasks] = useState([])

    // we will need our token to get our user
    // and know which tasks to get
    const { user, token } = useContext(AuthContext)

    // helper function to see if an object is empty
    const isEmpty = (obj) => {

        let returnValue = true

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                returnValue = false
            }
        }

        return returnValue
    }

    // the first time our app loads we want to
    // send a request to our server for 
    // information
    useEffect(() => {
        console.log("Tasks Context")

        // if there is a user
        // then get information from server
        if (!isEmpty(user)) {

            // get all tasks associated
            // with that user
            getTasksByUserId(user)
                .then(result => {
                    setTasks(result)
                })

            // only get this information from the
            // server if the user is admin
            if (user.admin) {
                
                // get all users in the db
                getAllUsers(token)
                    .then(result => {
                        setUsers(result)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                // get all tasks
                getAllTasks(token)
                    .then(result => {
                        setAllTasks(result)
                    })
            }
        }

    }, [user, token])


    return (
        <div>
            <TasksContext.Provider value={{ tasks, setTasks, users, setUsers, allTasks, setAllTasks }}>
                {props.children}
            </TasksContext.Provider>
        </div>
    );
};

const TasksConsumer = TasksContext.Consumer
export { TasksProvider, TasksConsumer, TasksContext }