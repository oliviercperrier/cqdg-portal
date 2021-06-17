import { ReactElement } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, gql, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RestLink } from 'apollo-link-rest';

import { DATA_STORAGE_API, GRAPHQL_API } from 'config/constants';
import { IProvider } from 'providers';
import { getToken } from 'providers/Keycloak/keycloak';
import { cache } from 'store/cache';

const httpLink = createHttpLink({
    uri: `${GRAPHQL_API}/cqdg/graphql`,
});

const restEndpoints = new RestLink({
    endpoints: {
        dataApi: GRAPHQL_API,
        dataStorage: DATA_STORAGE_API,
    },
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const typeDefs = gql`
    extend type Query {
        locale: String!
        tableColumns: [TableColumns]!
    }

    type TableColumns {
        id: ID!
    }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: authLink.concat(restEndpoints).concat(httpLink),
    typeDefs,
});

export default ({ children }: IProvider): ReactElement => <ApolloProvider client={client}>{children}</ApolloProvider>;
