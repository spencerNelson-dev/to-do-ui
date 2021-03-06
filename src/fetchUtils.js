import { uriBase, currentApi, userApi, JWT_KEY } from './const'
import jwt from 'jsonwebtoken'

/*
This file contains all the fetch requests used in our react app
*/

/* fetch requests regarding tasks */
//#region 

// GET all the tasks by user id
export const getTasksByUserId = (user, token) => {

    console.log("fetch", user._id)

    return fetch(`${uriBase}${currentApi}/?userId=${user._id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
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

// get all tasks regarless of users
export const getAllTasks = (token) => {

    return fetch(`${uriBase}${currentApi}`, {
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
    .then(result => {

        return result
    })
    .catch(error => {
        console.log(error)
    })
}

// POST - Create new task given a task object
export const createNewTask = (newTask) => {

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

            return httpResult.json()
        })
        .catch(error => {
            console.log(error)
        })
}

// PUT - replace task geven task id and
// the new task information
export const replaceTask = (taskId, newTask) => {

    return fetch(`${uriBase}${currentApi}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    .then(httpResult => {
        if (!httpResult.ok) {
            throw new Error("Could not replace with PUT")
        }

        return httpResult.json()
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

//#endregion

/* fetch requrests regarding users */
//#region 

// GET all users
export const getAllUsers = (token) => {

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

// POST - create new user
export const createNewUser = (user, token) => {

    let createObj = {}
    createObj.doc = user

    return fetch(`${uriBase}${userApi}`,{ 
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

// POST - create new user not signed in
export const createNewUserNoToken = async (user) => {

    //make a token
    let token = await jwt.sign({email:"spencernelson144@gmail.com"}, JWT_KEY)

    let createObj = {}
    createObj.doc = user

    return fetch(`${uriBase}${userApi}`,{ 
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

    return fetch(`${uriBase}${userApi}/${user._id}`,{
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

// PATCH - update user
export const updateUser = (userId,updatedUser, token) => {

    return fetch(`${uriBase}${userApi}/${userId}`, {
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

//#endregion

