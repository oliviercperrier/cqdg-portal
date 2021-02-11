import React from 'react';

import ApolloProvider from './Apollo';
import FilterProvider from './Filter';
import IntlProvider from './Intl';
import KeycloakProvider from './Keycloak';

export interface IProvider {
    children: React.ReactNode;
}

export default ({ children }: IProvider): React.ReactElement => (
    <KeycloakProvider>
        <ApolloProvider>
            <FilterProvider>
                <IntlProvider>{children}</IntlProvider>
            </FilterProvider>
        </ApolloProvider>
    </KeycloakProvider>
);
