import { gql } from '@apollo/client';

export const FILE_GLOBAL_SEARCH = gql`
    query GetFileGlobalSearch($fileFilters: JSON) {
        File {
            hits(filters: $fileFilters) {
                edges {
                    node {
                        file_id
                        file_name
                    }
                }
            }
        }
    }
`;

export const STUDY_GLOBAL_SEARCH = gql`
    query GetStudyGlobalSearch($studyFilters: JSON) {
        Study {
            hits(filters: $studyFilters) {
                edges {
                    node {
                        name
                        study_id_keyword
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
                        study {
                            hits {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
