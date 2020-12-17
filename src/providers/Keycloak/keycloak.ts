import Keycloak from 'keycloak-js';

const keycloak: Keycloak.KeycloakInstance = Keycloak({
    clientId: 'cqdg-client',
    realm: 'CQDG',
    url: 'https://auth.qa.cqdg.ferlab.bio/auth/',
});

export default keycloak;
