declare global {
    interface Window {
        env: any;
    }
}

window.env = window.env || {};

// Keycloak
export const KEYCLOAK_CONFIGS =
    window.env.REACT_APP_KEYCLOAK_CONFIG || (process.env.REACT_APP_KEYCLOAK_CONFIG as string);
export const RESOURCE_SERVER_CLIENT =
    window.env.REACT_APP_KEYCLOAK_RESOURCE_SERVER_CLIENT ||
    (process.env.REACT_APP_KEYCLOAK_RESOURCE_SERVER_CLIENT as string);

// Endpoints
export const GRAPHQL_API = window.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL;
export const CLINICAL_DATA_API = window.env.REACT_APP_CLINICAL_DATA_API || process.env.REACT_APP_CLINICAL_DATA_API;
export const DATA_STORAGE_API = window.env.REACT_APP_DATA_STORAGE_API || process.env.REACT_APP_DATA_STORAGE_API;

// Env Urls
export const CQDG_DOCS_URL = window.env.REACT_APP_CQDG_DOCS_URL || process.env.REACT_APP_CQDG_DOCS_URL;

// Env debugging
export const IS_DEV_ENV = window.location.hostname.includes('localhost');

export const FILE_REPO_CACHE_KEY = 'file-repo';
export const STUDY_REPO_CACHE_KEY = 'study-repo';
