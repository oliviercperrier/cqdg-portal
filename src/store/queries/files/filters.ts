import { gql } from '@apollo/client';

export const FILE_GLOBAL_SEARCH = gql`
    query GetFileGlobalSearch($fileFilters: JSON) {
        File {
            hits(filters: $fileFilters) {
                edges {
                    node {
                        internal_file_id
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

export const STUDY_GLOBAL_SEARCH = gql`
    query GetStudyGlobalSearch($studyFilters: JSON) {
        Study {
            hits(filters: $studyFilters) {
                edges {
                    node {
                        name
                        internal_study_id
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
                        internal_donor_id
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
