import React from 'react';

import ApolloProvider from './Apollo';
import IntlProvider from './Intl';
import KeycloakProvider from './Keycloak';

export interface IProvider {
    children: React.ReactNode;
}

export default ({ children }: IProvider): React.ReactElement => (
    <KeycloakProvider>
        <ApolloProvider>
            <IntlProvider>{children}</IntlProvider>
        </ApolloProvider>
    </KeycloakProvider>
);
