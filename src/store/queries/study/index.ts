import { gql } from '@apollo/client';

export const STUDY_DATA_PAGE = gql`
    query GetStudyData($studyFilters: JSON, $fileFilters: JSON) {
        Study {
            hits(filters: $studyFilters) {
                edges {
                    node {
                        name
                        donors {
                            hits {
                                total
                            }
                        }
                        files {
                            hits {
                                total
                            }
                            aggregations {
                                file_size {
                                    stats {
                                        sum
                                    }
                                }
                            }
                        }
                        study_id_keyword
                        domain
                        population
                    }
                }
            }
            aggregations(filters: $studyFilters) {
                files__file_size {
                    stats {
                        sum
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
