import { gql } from '@apollo/client';

export const FILE_PAGE_METADATA = gql`
    query GetFileMetaData($offset: Int, $sort: [Sort], $first: Int, $filters: JSON) {
        File {
            hits(offset: $offset, sort: $sort, first: $first, filters: $filters) {
                total
            }
        }
        Donor {
            hits(offset: $offset, sort: $sort, filters: $filters, first: $first) {
                total
            }
        }
    }
`;
