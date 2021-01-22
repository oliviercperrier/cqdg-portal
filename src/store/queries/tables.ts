import { gql } from '@apollo/client';

export const GET_TABLE_COLUMNS = gql`
    query GetTableColumns($key: String, $default: [TableColumns]) {
        tableColumns @client
    }
`;
