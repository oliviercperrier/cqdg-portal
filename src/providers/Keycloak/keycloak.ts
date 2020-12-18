import Keycloak from 'keycloak-js';
import get from 'lodash/get';

const keyCloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_CONFIG as string);
const keycloak: Keycloak.KeycloakInstance = Keycloak(keyCloakConfig);

export const isAuthenticated = (): boolean => get(keycloak, 'authenticated', false);

export default keycloak;
