import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FileRepoPage from 'pages/FileRepo';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import StudyPage from 'pages/Study';

import Head from 'components/Seo/Head';

import AuthRoute from './AuthRoute';

export default (): React.ReactElement => (
    <Router>
        <Route>{({ location: { pathname } }) => <Head pageName={pathname.split('/')[1]} />}</Route>
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
