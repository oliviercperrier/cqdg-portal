import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FilesPage from 'pages/Files';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import StudiesPage from 'pages/Studies';

import Head from 'components/seo/Head';

import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';

export default (): React.ReactElement => (
    <Router>
        <Route>{({ location: { pathname } }) => <Head pageName={pathname.split('/')[1]} />}</Route>
        <Switch>
            <PublicRoute exact path="/">
                <HomePage />
            </PublicRoute>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <AuthRoute component={FilesPage} exact path="/files" />
            <AuthRoute component={StudiesPage} exact path="/studies" />
        </Switch>
    </Router>
);
