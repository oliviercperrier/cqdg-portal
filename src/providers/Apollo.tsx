import React, { ReactElement } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IProvider } from 'providers';
import { getTokens } from 'providers/Keycloak/tokens';
import { cache } from 'store/cache';

import { GRAPHQL_API } from 'config/constants';

const httpLink = createHttpLink({
    uri: `${GRAPHQL_API}/cqdg/graphql`,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { token } = getTokens();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
});

export default ({ children }: IProvider): ReactElement => <ApolloProvider client={client}>{children}</ApolloProvider>;
