import { InMemoryCache } from '@apollo/client';
import get from 'lodash/get';

import { locales } from './locales';
import { configureColumns, tableColumns } from './tableColumns';
import { terms } from './terms';

export const cache: InMemoryCache = new InMemoryCache({
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
                terms: {
                    read: () => terms(),
                },
            },
        },
    },
});
