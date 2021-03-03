import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from 'components/seo/Head';
import FilesPage from 'pages/Files';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import StudiesPage from 'pages/Studies';

import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';

export enum Routes {
    ROOT = '/',
    FILES = '/files',
    STUDIES = '/studies',
    LOGIN = '/login',
}

export default (): React.ReactElement => (
    <Router>
        <Route>{({ location: { pathname } }) => <Head pageName={pathname.split('/')[1]} />}</Route>
        <Switch>
            <PublicRoute exact path={Routes.ROOT}>
                <HomePage />
            </PublicRoute>
            <Route exact path={Routes.LOGIN}>
                <LoginPage />
            </Route>
            <AuthRoute component={FilesPage} exact path={Routes.FILES} />
            <AuthRoute component={StudiesPage} exact path={Routes.STUDIES} />
        </Switch>
    </Router>
);
