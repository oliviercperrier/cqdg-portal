import { gql } from '@apollo/client';

export const DONOR_PAGE_DATA = gql`
    query GetStudyData($donorFilters: JSON, $fileFilters: JSON) {
        Donor {
            hits(filters: $donorFilters) {
                edges {
                    node {
                        donor_id
                        submitter_donor_id
                        files {
                            hits {
                                total
                            }
                        }
                        study {
                            hits {
                                total
                                edges {
                                    node {
                                        study_id_keyword
                                        domain
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        File {
            #Once the files.file_size existe in Study, remove this aggregation
            aggregations(filters: $fileFilters) {
                file_size {
                    stats {
                        sum
                    }
                }
            }
        }
    }
`;
