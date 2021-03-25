declare global {
    interface Window {
        env: any;
    }
}

window.env = window.env || {};

export const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME as string;
export const REFRESH_TOKEN_NAME = process.env.REACT_APP_REFRESH_TOKEN_NAME as string;
export const SESSION_TOKEN_NAME = process.env.REACT_APP_SESSION_TOKEN_NAME as string;
export const KEYCLOAK_CONFIGS =
    window.env.REACT_APP_KEYCLOAK_CONFIG || (process.env.REACT_APP_KEYCLOAK_CONFIG as string);
export const GRAPHQL_API = window.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL;
export const CLINICAL_DATA_API = window.env.REACT_APP_CLINICAL_DATA_API || process.env.REACT_APP_CLINICAL_DATA_API;
export const IS_DEV_ENV = window.location.hostname.includes('localhost');
export const IS_QA_ENV = window.location.hostname.includes('.qa.');
