//const uriBase = "http://localhost:5001"
const uriBase = "https://sn-todo.herokuapp.com"


const currentApi = "/tasks"
const userApi = "/users"
const JWT_KEY = '12345'
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

module.exports.uriBase = uriBase
module.exports.currentApi = currentApi
module.exports.userApi = userApi
module.exports.JWT_KEY = JWT_KEY
module.exports.DUMMY_DATA = DUMMY_DATA