import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FileRepoPage from 'pages/FileRepo';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import StudyPage from 'pages/Study';

import AuthRoute from './AuthRoute';

export default (): React.ReactElement => (
    <Router>
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <AuthRoute component={FileRepoPage} exact path="/files" />
            <AuthRoute component={StudyPage} exact path="/studies" />
        </Switch>
    </Router>
);
