import { gql } from '@apollo/client';

export const DONOR_TAB_DATA = gql`
    query GetFilePageData($offset: Int, $sort: [Sort], $first: Int, $donorFilters: JSON) {
        Donor {
            hits(first: $first, offset: $offset, sort: $sort, filters: $donorFilters) {
                total
                edges {
                    node {
                        id
                        submitter_donor_id
                        gender
                        ethnicity
                        vital_status
                        age_at_recruitment
                        study {
                            hits {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }

                        diagnoses {
                            hits {
                                total
                                edges {
                                    node {
                                        age_at_diagnosis
                                        icd_category_keyword
                                        icd_term
                                    }
                                }
                            }
                        }

                        phenotypes {
                            hits {
                                total
                                edges {
                                    node {
                                        hpo_term
                                    }
                                }
                            }
                        }

                        files {
                            hits {
                                total
                                edges {
                                    node {
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
