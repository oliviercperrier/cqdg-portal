import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import qs from 'query-string';

import { getWithExpiry, setWithExpiry } from 'utils/storage';

import { KEYCLOAK_CONFIGS, RESOURCE_SERVER_CLIENT } from '../../config/constants';

import { ITokens } from './tokens';

const PERMISSIONS = 'PERMISSIONS';

export const setPermissions = ({ token }: ITokens): void => {
    if (token) {
        const tokenDecoded: JwtPayload = jwt_decode(token);

        if (tokenDecoded) {
            const formData = qs.stringify({
                audience: RESOURCE_SERVER_CLIENT,
                grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
                response_mode: 'permissions',
            });

            const keycloakConf = JSON.parse(KEYCLOAK_CONFIGS);

            axios
                .post(`${keycloakConf.url}/realms/${keycloakConf.realm}/protocol/openid-connect/token`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    setWithExpiry(PERMISSIONS, response.data, tokenDecoded.exp!);
                })
                .catch((error) => {
                    // console.error("Failed to retrieve user's permissions", error);
                });
        }
    }
};

// [
//     {
//         "rsid": "7e927587-fa34-48fb-ae90-ab8ae3fae91c",
//         "rsname": "FI000004"
//     }
// ]
export const getPermissions = (): any[] => getWithExpiry(PERMISSIONS) || [];
