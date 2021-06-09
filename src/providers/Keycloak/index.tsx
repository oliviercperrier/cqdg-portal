import React, { ReactElement } from 'react';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';

import { IProvider } from 'providers';

import keycloak from './keycloak';
import { setPermissions } from './permissions';

const eventLogger = (event: unknown, error: unknown) => {
    // eslint-disable-next-line no-console
    console.log('onKeycloakEvent', event, error);
};

const tokenHandler = (tokens: any) => {
    setPermissions(tokens);
};

export default ({ children }: IProvider): ReactElement => (
    <KeycloakProvider authClient={keycloak} onEvent={eventLogger} onTokens={tokenHandler}>
        {children}
    </KeycloakProvider>
);
