import { gql } from '@apollo/client';

export const GET_FILES = gql`
    query GetFile($hitsOffset: Int, $hitsFirst: Int) {
        File {
            hits(offset: $hitsOffset, first: $hitsFirst) {
                edges {
                    node {
                        id
                        data_access
                        data_category
                        data_type
                        experimental_strategy
                    }
                }
            }
        }
    }
`;
