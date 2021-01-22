import React, { ReactElement } from 'react';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';

import { IProvider } from 'providers';

import keycloak from './keycloak';
import { getTokens, setTokens } from './tokens';

const eventLogger = (event: unknown, error: unknown) => {
    // eslint-disable-next-line no-console
    console.log('onKeycloakEvent', event, error);
};

const tokenHandler = (tokens: any) => {
    setTokens(tokens);
};

export default ({ children }: IProvider): ReactElement => (
    <KeycloakProvider authClient={keycloak} initOptions={getTokens()} onEvent={eventLogger} onTokens={tokenHandler}>
        {children}
    </KeycloakProvider>
);
