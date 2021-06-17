import { gql } from '@apollo/client';

export const DONOR_PAGE_DATA = gql`
    query GetStudyData($donorFilters: JSON) {
        Donor {
            hits(filters: $donorFilters) {
                edges {
                    node {
                        internal_donor_id
                        study_version_creation_date
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
                                        internal_study_id
                                        domain
                                        access_authority
                                        data_access_codes {
                                            access_limitations
                                            access_requirements
                                        }
                                    }
                                }
                            }
                        }
                        summary {
                            clinical_data_available {
                                hits {
                                    edges {
                                        node {
                                            key
                                            available
                                        }
                                    }
                                }
                            }
                            data_category {
                                hits {
                                    edges {
                                        node {
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
            aggregations(filters: $donorFilters) {
                files__file_size {
                    stats {
                        sum
                    }
                }
            }
        }
    }
`;
