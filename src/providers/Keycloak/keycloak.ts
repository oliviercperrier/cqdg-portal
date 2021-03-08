import Keycloak from 'keycloak-js';
import get from 'lodash/get';

import { KEYCLOAK_CONFIGS } from 'config/constants';

const keyCloakConfig = JSON.parse(KEYCLOAK_CONFIGS);
const keycloak: Keycloak.KeycloakInstance = Keycloak(keyCloakConfig);

export const isAuthenticated = (kc: Keycloak.KeycloakInstance): boolean => get(kc, 'authenticated', false);

export default keycloak;
