import { gql } from '@apollo/client';
export const FILE_SUMMARY_DATA = gql`
    query GetSummaryData($fileFilters: JSON, $donorFilters: JSON) {
        File {
            pies: aggregations(filters: $fileFilters, aggregations_filter_themselves: true) {
                study__short_name_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
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
                experimental_strategy {
                    buckets {
                        doc_count
                        key
                    }
                }
            }
        }
        Donor {
            pies: aggregations(filters: $donorFilters, aggregations_filter_themselves: true) {
                study__short_name_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                diagnoses__mondo_term_keyword {
                    #TODO: Aggregate Number of donors (by study.short_name)
                    buckets {
                        doc_count
                        key
                    }
                }
                phenotypes__hpo_category_keyword {
                    #TODO: Aggregate Number of donors (by study.short_name)
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
                #TODO: Aggregate Number of donors (by study.short_name)
                #diagnoses__age_at_diagnosis {
                #    buckets {
                #        doc_count
                #        key
                #    }
                #}
            }
        }
    }
`;
