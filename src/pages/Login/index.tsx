import React from 'react';
import { useCallback } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import get from 'lodash/get';

import Header from 'components/Header';

const Login = () => {
    const location = useLocation<{ [key: string]: unknown }>();
    const currentLocationState = location.state || {
        from: { pathname: '/' },
    };

    const { keycloak } = useKeycloak();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    const loginHanlder = useCallback(() => {
        if (keycloak) {
            keycloak.login();
        }
    }, [keycloak]);
    if (isAuthenticated) return <Redirect to={currentLocationState.from as string} />;

    return (
        <div>
            <Header />
            <div>login Page</div>
            <button onClick={loginHanlder}>LOGIN</button>
        </div>
    );
};
export default Login;
