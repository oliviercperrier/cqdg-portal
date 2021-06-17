import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import qs from 'query-string';

import { KEYCLOAK_CONFIGS, RESOURCE_SERVER_CLIENT } from 'config/constants';
import { getWithExpiry, setWithExpiry } from 'utils/storage';

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

interface IPermissions {
    rsid: string;
    rsname: string;
}
const getPermissions = (): IPermissions[] => getWithExpiry(PERMISSIONS) || [];
export const getFilePermissions = (): string[] => getPermissions().map((item) => item.rsname);
