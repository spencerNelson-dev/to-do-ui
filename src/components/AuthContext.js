import React from 'react';

const AuthContext = React.createContext({})

const AuthProvider = (props) => {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [token, setToken] = React.useState('')
    const [admin, setAdmin] = React.useState(false)

    const writeToken = (token) => {

        setToken(token)
    }

    return (
        <div>
            <AuthContext.Provider value ={{loggedIn, setLoggedIn, token, setToken, admin, setAdmin}}>
                {props.children}
            </AuthContext.Provider>
        </div>
    );
};

const AuthConsumer = AuthContext.Consumer
export {AuthProvider, AuthConsumer, AuthContext}