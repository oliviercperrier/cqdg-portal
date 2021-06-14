import { gql } from '@apollo/client';

export const STUDY_DATA_PAGE = gql`
    query GetStudyData($studyFilters: JSON, $fileFilters: JSON) {
        Study {
            hits(filters: $studyFilters) {
                edges {
                    node {
                        access_authority
                        data_access_codes {
                            access_requirements
                            access_limitations
                        }
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
                        internal_study_id
                        domain
                        population
                        keyword
                        summary {
                            clinical_data_available {
                                hits {
                                    edges {
                                        node {
                                            donors
                                            key
                                        }
                                    }
                                }
                            }
                            data_category {
                                hits {
                                    edges {
                                        node {
                                            donors
                                            files
                                            key
                                        }
                                    }
                                }
                            }
                            experimental_strategy {
                                hits {
                                    edges {
                                        node {
                                            donors
                                            files
                                            key
                                        }
                                    }
                                }
                            }
                        }
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
