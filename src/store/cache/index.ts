import { InMemoryCache } from '@apollo/client';

import { locales } from './locales';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                locale: {
                    read: () => locales(),
                },
            },
        },
    },
});
