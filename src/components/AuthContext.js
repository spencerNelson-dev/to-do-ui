import React from 'react';
import { verifyToken } from '../jwtUtils';
import { JWT_KEY } from '../const';

const AuthContext = React.createContext({})

const AuthProvider = (props) => {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [token, setToken] = React.useState(window.localStorage.getItem('token'))
    const [admin, setAdmin] = React.useState(false)
    const [user, setUser] = React.useState({})


    // we want to load tasks for the user in the token
    React.useEffect(() => {

        // if there is a token set
        if (token) {

            // verify the token
            // set user state
            verifyToken(token, JWT_KEY)
                .then(result => {
                    //update user state
                    setUser(result.user)
                })
                .catch(error => {

                    //if something goes wrong with verifying
                    //the token, clear the tokens
                    setToken('')
                    window.localStorage.removeItem('token')
                    console.log("AuthContext", error)
                })
        }

    }, [token])


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