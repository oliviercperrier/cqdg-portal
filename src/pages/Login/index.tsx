import React from 'react';
import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';
import get from 'lodash/get';

import { GET_LOCALE } from 'store/queries/locales';

interface ILocation {
    from: string;
}

const Login = (): React.ReactElement => {
    const location = useLocation<{ [key: string]: any }>();
    const {
        data: { locale },
    } = useQuery<any>(GET_LOCALE);

    const defaultLoginLocation = '/files';
    const currentLocationState: ILocation = (location.state as ILocation) || {
        from: defaultLoginLocation,
    };

    const { initialized, keycloak } = useKeycloak();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    useEffect(() => {
        if (initialized && keycloak && !isAuthenticated) {
            let redirectLocation = currentLocationState.from;
            if (redirectLocation === '/') {
                redirectLocation = defaultLoginLocation;
            }
            keycloak.login({
                locale,
                redirectUri: `${window.location.origin}/terms?redirectAfter=${redirectLocation}`,
            });
        }
    }, [initialized]);

    if (isAuthenticated) return <Redirect to={currentLocationState.from} />;
    return <Spin spinning />;
};
export default Login;
