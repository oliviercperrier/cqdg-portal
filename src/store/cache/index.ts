import { InMemoryCache } from '@apollo/client';
import get from 'lodash/get';

import { locales } from './locales';
import { configureColumns, tableColumns } from './tableColumns';

export const cache: InMemoryCache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
        Query: {
            fields: {
                locale: {
                    read: () => locales(),
                },
                tableColumns: {
                    read: (_, { variables }) => {
                        const columns = get(tableColumns(), variables!.key, null);
                        if (!columns) {
                            return variables!.default;
                        }
                        return configureColumns(variables!.default, columns);
                    },
                },
            },
        },
    },
});
