import { REFRESH_TOKEN_NAME, SESSION_TOKEN_NAME, TOKEN_NAME } from 'config/constants';
export const setTokens = (tokens: Record<string, string>): void => {
    localStorage.setItem(SESSION_TOKEN_NAME, tokens.idToken || '');
    localStorage.setItem(TOKEN_NAME, tokens.token || '');
    localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refreshToken || '');
};

interface ITokens {
    idToken: string;
    token: string;
    refreshToken: string;
}

export const getTokens = (): ITokens => ({
    idToken: localStorage.getItem(SESSION_TOKEN_NAME) || '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_NAME) || '',
    token: localStorage.getItem(TOKEN_NAME) || '',
});
