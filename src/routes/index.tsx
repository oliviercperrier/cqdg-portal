import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from 'components/seo/Head';
import AppLayout from 'layouts/App';
import EntityLayout from 'layouts/Entity';
import DonorPage from 'pages/Donor';
import FilesPage from 'pages/Files';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import LogoutPage from 'pages/Logout';
import StudiesPage from 'pages/Studies';
import StudyPage from 'pages/Study';
import TermsPage from 'pages/Terms';

import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';

export enum Routes {
    ROOT = '/',
    FILES = '/files',
    STUDIES = '/studies',
    STUDY = '/study/:id',
    DONOR = '/donor/:id',
    LOGIN = '/login',
    LOGOUT = '/logout',
    TERMS = '/terms',
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
            <Route exact path={Routes.LOGOUT}>
                <LogoutPage />
            </Route>
            <AuthRoute component={FilesPage} exact layout={AppLayout} path={Routes.FILES} />
            <AuthRoute component={StudyPage} exact layout={EntityLayout} path={Routes.STUDY} />
            <AuthRoute component={DonorPage} exact layout={EntityLayout} path={Routes.DONOR} />
            <AuthRoute component={StudiesPage} exact layout={AppLayout} path={Routes.STUDIES} />
            <AuthRoute component={TermsPage} exact hasToAcceptTerms={false} path={Routes.TERMS} />
        </Switch>
    </Router>
);
