import React, { ReactElement } from 'react';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';
import { IProvider } from 'providers';

import keycloak from './keycloak';

const eventLogger = (event: unknown, error: unknown) => {
    console.log('onKeycloakEvent', event, error);
};

const tokenLogger = (tokens: unknown) => {
    console.log('onKeycloakTokens', tokens);
};

export default ({ children }: IProvider): ReactElement => (
    <KeycloakProvider authClient={keycloak} onEvent={eventLogger} onTokens={tokenLogger}>
        {children}
    </KeycloakProvider>
);
