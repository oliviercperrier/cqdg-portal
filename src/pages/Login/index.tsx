import React from 'react';
import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';
import get from 'lodash/get';

import { isTermsAccepted } from 'store/cache/terms';
import { GET_LOCALE } from 'store/queries/locales';

interface ILocation {
    from: string;
}

export const DEFAULT_LOGIN_LOCATION = '/studies';

const Login = (): React.ReactElement => {
    const location = useLocation<{ [key: string]: any }>();
    const {
        data: { locale },
    } = useQuery<any>(GET_LOCALE);

    const currentLocationState: ILocation = (location.state as ILocation) || {
        from: DEFAULT_LOGIN_LOCATION,
    };

    const { initialized, keycloak } = useKeycloak();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    useEffect(() => {
        if (initialized && keycloak && !isAuthenticated) {
            let redirectLocation = currentLocationState.from;
            if (redirectLocation === '/') {
                redirectLocation = DEFAULT_LOGIN_LOCATION;
            }
            let redirectUri = `${window.location.origin}/terms?redirectAfter=${redirectLocation}`;
            if (isTermsAccepted()) {
                redirectUri = `${window.location.origin}${redirectLocation}`;
            }
            keycloak.login({
                locale,
                redirectUri,
            });
        }
    }, [initialized]);

    if (isAuthenticated) return <Redirect to={currentLocationState.from} />;
    return <Spin spinning />;
};
export default Login;
