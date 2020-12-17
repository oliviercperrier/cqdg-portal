import React, { ReactElement } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { IProvider } from 'providers';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://portal.qa.cqdg.ferlab.bio/arranger/cqdg/',
});

export default ({ children }: IProvider): ReactElement => <ApolloProvider client={client}>{children}</ApolloProvider>;
