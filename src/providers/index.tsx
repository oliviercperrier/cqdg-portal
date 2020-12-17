import React from 'react';

import ApolloProvider from './Apollo';
import KeycloakProvider from './Keycloak';

export interface IProvider {
    children: React.ReactNode;
}

export default ({ children }: IProvider): React.ReactElement => (
    <KeycloakProvider>
        <ApolloProvider>{children}</ApolloProvider>
    </KeycloakProvider>
);
