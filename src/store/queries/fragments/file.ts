import { gql } from '@apollo/client';

export const FILE_DATA = gql`
    fragment FileFragment on FileNode {
        internal_file_id
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
