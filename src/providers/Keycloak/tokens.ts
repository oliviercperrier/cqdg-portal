import jwt_decode, { JwtPayload } from 'jwt-decode';

import { REFRESH_TOKEN_NAME, SESSION_TOKEN_NAME, TOKEN_NAME } from 'config/constants';
import { getWithExpiry, setWithExpiry } from 'utils/storage';

interface ITOKEN {
    idToken: string;
    token: string;
    refreshToken: string;
}
export const setTokens = ({ idToken = '', refreshToken = '', token = '' }: ITOKEN): void => {
    if (!idToken && !refreshToken && !token) {
        return;
    }

    const idTokenDecoded: JwtPayload = jwt_decode(idToken);
    const tokenDecoded: JwtPayload = jwt_decode(token);
    const refreshTokenDecoded: JwtPayload = jwt_decode(refreshToken);

    if (idTokenDecoded && tokenDecoded && refreshTokenDecoded) {
        setWithExpiry(SESSION_TOKEN_NAME, idToken, idTokenDecoded.exp!);
        setWithExpiry(TOKEN_NAME, token, tokenDecoded.exp!);
        setWithExpiry(REFRESH_TOKEN_NAME, refreshToken, refreshTokenDecoded.exp!);
    }
};

interface ITokens {
    idToken: string;
    token: string;
    refreshToken: string;
}

export const getTokens = (): ITokens => ({
    idToken: getWithExpiry(SESSION_TOKEN_NAME) || '',
    refreshToken: getWithExpiry(REFRESH_TOKEN_NAME) || '',
    token: getWithExpiry(TOKEN_NAME) || '',
});
