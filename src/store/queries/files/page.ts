import { gql } from '@apollo/client';

export const FILE_PAGE_METADATA = gql`
    query GetFileMetaData($offset: Int, $sort: [Sort], $first: Int, $fileFilters: JSON, $donorFilters: JSON) {
        File {
            hits(offset: $offset, sort: $sort, first: $first, filters: $fileFilters) {
                total
            }
        }
        Donor {
            hits(offset: $offset, sort: $sort, filters: $donorFilters, first: $first) {
                total
            }
        }
    }
`;
