import Keycloak from 'keycloak-js';
import get from 'lodash/get';

import { KEYCLOAK_CONFIGS } from 'config/constants';

const keycloak: Keycloak.KeycloakInstance = Keycloak(KEYCLOAK_CONFIGS);

export const isAuthenticated = (kc: Keycloak.KeycloakInstance): boolean => get(kc, 'authenticated', false);

export default keycloak;
