import Keycloak from 'keycloak-js';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { KEYCLOAK_CONFIGS } from 'config/constants';

import { getTokens } from './tokens';

const keyCloakConfig = JSON.parse(KEYCLOAK_CONFIGS);
const keycloak: Keycloak.KeycloakInstance = Keycloak(keyCloakConfig);

export const isAuthenticated = (kc: Keycloak.KeycloakInstance): boolean => {
    const isAuth = get(kc, 'authenticated', false);
    const tokens = getTokens();

    return !isEmpty(tokens.token) || !isEmpty(tokens.refreshToken) || isAuth;
};

export default keycloak;
