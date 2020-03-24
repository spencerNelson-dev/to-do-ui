import { uriBase, currentApi, userApi } from './const'

/*
This file contains all the fetch requests used in our react app
*/

// GET all the tasks by user id
export const getTasksByUserId = (user) => {

    return fetch(`${uriBase}${currentApi}/${user._id}`, {
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
        .catch(error => {

            console.log(error)
        })
}

// GET all users
export const getAllUsers = (token) => {

    console.log("getAllUsers", token)

    return fetch(`${uriBase}${userApi}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(httpResult => {
        if(!httpResult.ok){
            throw new Error("Bad response")
        }

        return httpResult.json()
    })
    .catch(error => {
        console.log(error)
    })
}

// POST - Create new task given a task object
export const createNewTask = (newTask) => {

    console.log("createNewTask", newTask)

    return fetch(`${uriBase}${currentApi}`, {
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
        .catch(error => {
            console.log(error)
        })
}

// PATCH - update task given task id and what to change
// currently only the text and isComplete fields can be changed
export const updateTask = (taskId, change) => {

    let body = {}

    if(typeof change == typeof true){

        body = {"isComplete": !change}
    }
    else if (typeof change == typeof ''){
        
        body = {"text": change}
    }

    return fetch(`${uriBase}${currentApi}/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(httpResult => {
            if (!httpResult.ok) {
                throw new Error("Could not update with edit")
            }

            return httpResult
        })
        .catch(error => {
            console.log(error)
        })
}

// DELETE - delete a task given a task id
export const deleteTask = (taskId) => {

    return fetch(`${uriBase}${currentApi}/${taskId}`, {
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
}








export const getUserByGoogleEmail = (googleEmail) => {

}
