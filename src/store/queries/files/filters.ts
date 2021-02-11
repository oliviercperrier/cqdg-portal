import { gql } from '@apollo/client';

export const FILE_TAB_FILTERS = gql`
    query GetFileFilters($fileFilters: JSON) {
        File {
            aggregations(filters: $fileFilters) {
                data_category {
                    buckets {
                        doc_count
                        key
                    }
                }
                data_type {
                    buckets {
                        doc_count
                        key
                    }
                }
                is_harmonized {
                    buckets {
                        doc_count
                        key
                    }
                }
                experimental_strategy {
                    buckets {
                        doc_count
                        key
                    }
                }
                file_format {
                    buckets {
                        doc_count
                        key
                    }
                }
                data_access {
                    buckets {
                        doc_count
                        key
                    }
                }
                platform {
                    buckets {
                        doc_count
                        key
                    }
                }
                file_variant_class {
                    buckets {
                        doc_count
                        key
                    }
                }
            }
        }
    }
`;

export const DONOR_TAB_FILTERS = gql`
    query GetDonorFilters($donorFilters: JSON) {
        Donor {
            aggregations(filters: $donorFilters) {
                study__short_name_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                study__study_id_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                study__domain {
                    buckets {
                        doc_count
                        key
                    }
                }
                gender {
                    buckets {
                        doc_count
                        key
                    }
                }
                ethnicity {
                    buckets {
                        doc_count
                        key
                    }
                }
                vital_status {
                    buckets {
                        doc_count
                        key
                    }
                }
                diagnoses__icd_category_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                phenotypes__hpo_category_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                phenotypes__hpo_term_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                diagnoses__mondo_term_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
            }
        }
    }
`;
