import { gql } from '@apollo/client';

export const FILE_DATA = gql`
    fragment FileFragment on FileNode {
        id
        file_id
        file_name
        file_name_keyword
        file_size
        data_access
        data_category
        file_format
        data_type
        experimental_strategy
        platform
        is_harmonized
    }
`;

export const FILE_PAGE_METADATA = gql`
    query GetFileMetaData($hitsOffset: Int, $hitsSort: [Sort], $hitsFirst: Int, $hitsFilters: JSON) {
        File {
            hits(offset: $hitsOffset, sort: $hitsSort, first: $hitsFirst, filters: $hitsFilters) {
                total
            }
        }
        Donor {
            hits(offset: $hitsOffset, sort: $hitsSort, filters: $hitsFilters, first: $hitsFirst) {
                total
            }
        }
    }
`;
