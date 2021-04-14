import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';
import get from 'lodash/get';

import { destroyTokens } from 'providers/Keycloak/tokens';
import { setTerms } from 'store/cache/terms';

const Logout: React.FC = () => {
    const { initialized, keycloak } = useKeycloak();
    const history = useHistory();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    useEffect(() => {
        if (initialized && keycloak && isAuthenticated) {
            destroyTokens();
            setTerms(false);

            keycloak.logout({
                redirectUri: `${window.location.origin}`,
            });
        } else if (initialized && keycloak && !isAuthenticated) {
            history.push('/');
        }
    }, [initialized]);

    return <Spin />;
};
export default Logout;
