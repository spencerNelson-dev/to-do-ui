import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListOfTasks from './ListOfTasks';
import SignIn from './SignIn';
import {AuthProvider} from './AuthContext'
import {TasksProvider} from './TasksContext'
import ProtectedRoute from './ProtectedRoute'
import CreateUser from './CreateUser'
import Title from './Title'

function MainRouter(props) {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <TasksProvider>
                    <Title></Title>
                    <Switch>
                        <ProtectedRoute path='/tasks' component={ListOfTasks} />
                        <ProtectedRoute path='/create-user' component={CreateUser} />
                        <Route path='/' component={SignIn} />
                    </Switch>
                    </TasksProvider>
                </AuthProvider>
            </Router>
            
        </div>
    );
}

export default MainRouter;