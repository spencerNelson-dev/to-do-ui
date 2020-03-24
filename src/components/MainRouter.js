import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListOfTasks from './ListOfTasks';
import SignIn from './SignIn';
import {AuthProvider} from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import Test from './Test'
import CreateUser from './CreateUser'
import Title from './Title'

function MainRouter(props) {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Title></Title>
                    <Switch>
                        <ProtectedRoute path='/protected' component={Test} />
                        <ProtectedRoute path='/tasks' component={ListOfTasks} />
                        <ProtectedRoute path='/create-user' component={CreateUser} />
                        <Route path='/' component={SignIn} />
                    </Switch>
                </AuthProvider>
            </Router>
            
        </div>
    );
}

export default MainRouter;