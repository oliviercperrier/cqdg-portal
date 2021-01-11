import Keycloak from 'keycloak-js';
import get from 'lodash/get';

const keyCloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_CONFIG as string);
const keycloak: Keycloak.KeycloakInstance = Keycloak(keyCloakConfig);

export const isAuthenticated = (kc: Keycloak.KeycloakInstance): boolean => get(kc, 'authenticated', false);

export default keycloak;
