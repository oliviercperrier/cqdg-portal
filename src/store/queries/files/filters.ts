import { gql } from '@apollo/client';

export const FILE_GLOBAL_SEARCH = gql`
    query GetFileGlobalSearch($fileFilters: JSON) {
        File {
            hits(filters: $fileFilters) {
                edges {
                    node {
                        id
                        file_name
                    }
                }
            }
        }
    }
`;

export const DONOR_GLOBAL_SEARCH = gql`
    query GetDonorGlobalSearch($donorFilters: JSON) {
        Donor {
            hits(filters: $donorFilters) {
                edges {
                    node {
                        submitter_donor_id
                    }
                }
            }
        }
    }
`;
