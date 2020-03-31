
const currentApi = "/tasks"
const userApi = "/users"
const JWT_KEY = 'abc123'
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

//const uriBase = "http://localhost:5001"
//const uriBase = "https://sn-todo.herokuapp.com"

// here we switch our uriBase according to the node environment
const uriBase = process.env.NODE_ENV !== 'production' ? (
    "http://localhost:5001"
) : (
    "" // this is blank because heroku adds the base for us
)



module.exports.uriBase = uriBase
module.exports.currentApi = currentApi
module.exports.userApi = userApi
module.exports.JWT_KEY = JWT_KEY
module.exports.DUMMY_DATA = DUMMY_DATA