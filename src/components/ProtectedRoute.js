import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthConsumer} from './AuthContext'

export default function ProtectedRoute ({component: Component, ...rest}) {

    return (
        <AuthConsumer>
            {
                ({token}) => (

                    <Route
                        render ={props => 

                            token !== "" ? <Component {...props} /> : <Redirect to='/'/>
                        }
                        {...rest}
                    />
                )
            }
        </AuthConsumer>
    )

}