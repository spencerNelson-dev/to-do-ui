import { uriBase, currentApi, userApi } from './const'

/*
This file contains all the fetch requests used in our react app
*/

// GET all the tasks by user id
export const getTasksByUserId = (user) => {

    return fetch(`${currentApi}/${user._id}`, {
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

    return fetch(`${userApi}`, {
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

// POST - create new user
export const createNewUser = (user, token) => {

    let createObj = {}
    createObj.doc = user

    return fetch(`${userApi}/create`,{ 
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createObj)
    })
    .then(httpResult => {
        if(!httpResult.ok){
            throw new Error("CreateNewUser Failed")
        }

        return httpResult.json()
    })
    .catch(error => {
        console.log(error)
    })
}

// delete user
export const deleteUser = (user, token) => {

    return fetch(`${userApi}/delete/${user._id}`,{
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(httpResult => {
        if (!httpResult.ok) {
            throw new Error("Bad response")
        }

        return httpResult.json()
    })
}

// POST - Create new task given a task object
export const createNewTask = (newTask) => {

    return fetch(`${currentApi}`, {
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

// PATCH - update user
export const updateUser = (userId,updatedUser, token) => {

    return fetch(`${userApi}/update/${userId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)

    })
    .then(httpResult => {
        if(!httpResult.ok){
            throw new Error("Could not update user")
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

    return fetch(`${currentApi}/${taskId}`, {
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

    return fetch(`${currentApi}/${taskId}`, {
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

