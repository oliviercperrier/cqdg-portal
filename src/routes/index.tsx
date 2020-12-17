import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FileRepoPage from 'pages/FileRepo';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';

import PrivateRoute from './PrivateRoute';

export default (): React.ReactElement => (
    <Router>
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <PrivateRoute component={FileRepoPage} exact path="/files" />
        </Switch>
    </Router>
);
