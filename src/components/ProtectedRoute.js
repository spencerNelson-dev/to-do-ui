import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthConsumer} from './AuthContext'

export default function ProtectedRoute ({component: Component, ...rest}) {

    return (
        <AuthConsumer>
            {
                ({loggedIn}) => (

                    <Route
                        render ={props => 

                            loggedIn ? <Component {...props} /> : <Redirect to='/'/>
                        }
                        {...rest}
                    />
                )
            }
        </AuthConsumer>
    )

}