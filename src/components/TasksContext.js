import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getTasksByUserId } from '../fetchUtils'

const TasksContext = React.createContext({})

const TasksProvider = (props) => {

    // set our state:
    // we want our components to see what
    // tasks are available
    const [tasks, setTasks] = useState([])

    // we will need our token to get our user
    // and know which tasks to get
    const { user } = useContext(AuthContext)

    // the first time our app loads we want to
    // send a request to our server for the 
    // list of tasks, but we don't want to call
    // the server each time we update our state
    useEffect(() => {

        // if tasks have not been loaded
        // from database
        if (tasks.length === 0) {

            //get tasks by user
            getTasksByUserId(user)
            .then(result => {
                setTasks(result)
            })
        }
    }, [tasks.length, user])

    return (
        <div>
            <TasksContext.Provider value={{ tasks, setTasks }}>
                {props.children}
            </TasksContext.Provider>
        </div>
    );
};

const TasksConsumer = TasksContext.Consumer
export { TasksProvider, TasksConsumer, TasksContext }