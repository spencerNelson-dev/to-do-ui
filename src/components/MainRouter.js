import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListOfTasks from './ListOfTasks';
import SignIn from './SignIn';
import {AuthProvider} from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import Test from './Test'

function MainRouter(props) {
    return (
        <div>
            <Router>
                <AuthProvider>
                <Switch>
                    <ProtectedRoute path='/protected' component={Test} />
                    <ProtectedRoute path='/tasks' component={ListOfTasks} />
                    <Route path='/' component={SignIn} />
                </Switch>
                </AuthProvider>
            </Router>
            
        </div>
    );
}

export default MainRouter;