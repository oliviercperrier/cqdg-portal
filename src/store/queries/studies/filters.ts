import { gql } from '@apollo/client';

export const STUDY_FILTERS = gql`
    query GetStudyFilters($studyFilters: JSON) {
        Study {
            aggregations(filters: $studyFilters) {
                short_name_keyword {
                    buckets {
                        doc_count
                        key
                    }
                }
                domain {
                    buckets {
                        doc_count
                        key
                    }
                }
                population {
                    buckets {
                        doc_count
                        key
                    }
                }
                donors__phenotypes__hpo_category_keyword {
                    #Type d'anomalie
                    buckets {
                        doc_count
                        key
                    }
                }
                donors__diagnoses__icd_category_keyword {
                    #type de maladie (CIM-10)
                    buckets {
                        doc_count
                        key
                    }
                }
                donors__diagnoses__mondo_term_keyword {
                    #type de maladie (mondo)
                    buckets {
                        key
                        doc_count
                    }
                }
                files__data_category {
                    # Category de donne (files)
                    buckets {
                        key
                        doc_count
                    }
                }
            }
        }
    }
`;
