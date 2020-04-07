import React from 'react';
import { verifyToken } from '../jwtUtils';
import { JWT_KEY } from '../const';

const AuthContext = React.createContext({})

const AuthProvider = (props) => {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [token, setToken] = React.useState(window.localStorage.getItem('token'))
    const [admin, setAdmin] = React.useState(false)
    const [user, setUser] = React.useState({})

    // helper function to check if an object is empty
    const isEmpty = (obj) => {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false
        }
        return true
    }


    React.useEffect(() => {

        //if user is empty
        if (isEmpty(user)) {

            // if there is a token set
            if (token) {

                // verify the token
                // set user state
                verifyToken(token, JWT_KEY)
                    .then(result => {
                        setUser(result.user)
                        console.log("AuthContext user", result)
                    })
                    .catch(error => {
                        //if something goes wrong with verifying
                        //the token, clear the tokens
                        setToken('')
                        window.localStorage.removeItem('token')
                        console.log("AuthContext", error)
                    })
            }
        }

    }, [token, user])


    return (
        <div>
            <AuthContext.Provider value={
                { loggedIn, setLoggedIn, token, setToken, admin, setAdmin, user, setUser }
            }>
                {props.children}
            </AuthContext.Provider>
        </div>
    );
};

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer, AuthContext }