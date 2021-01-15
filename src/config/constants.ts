export const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME as string;
export const REFRESH_TOKEN_NAME = process.env.REACT_APP_REFRESH_TOKEN_NAME as string;
export const SESSION_TOKEN_NAME = process.env.REACT_APP_SESSION_TOKEN_NAME as string;

export const GRAPHQL_API = process.env.REACT_APP_API_URL;
export const IS_DEV_ENV = window.location.hostname.includes('localhost');
