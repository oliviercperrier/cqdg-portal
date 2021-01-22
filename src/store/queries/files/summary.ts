import { gql } from '@apollo/client';
export const FILE_SUMMARY_DATA = gql`
    query GetSummaryData($filters: JSON) {
        File {
            pies: aggregations(filters: $filters, aggregations_filter_themselves: true) {
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
                study__short_name_keyword {
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
            }
        }
        Donor {
            pies: aggregations(filters: $filters, aggregations_filter_themselves: true) {
                study__short_name_keyword {
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
                diagnoses__mondo_term_keyword {
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
            }
        }
    }
`;
