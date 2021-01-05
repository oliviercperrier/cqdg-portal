import React from 'react';
import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';
import get from 'lodash/get';

const Login = (): React.ReactElement => {
    const location = useLocation<{ [key: string]: unknown }>();
    const currentLocationState = location.state || {
        from: { pathname: '/' },
    };

    const { initialized, keycloak } = useKeycloak();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    useEffect(() => {
        if (initialized && keycloak && !isAuthenticated) {
            keycloak.login();
        }
    }, [initialized]);

    if (isAuthenticated) return <Redirect to={currentLocationState.from as string} />;
    return <Spin spinning />;
};
export default Login;
