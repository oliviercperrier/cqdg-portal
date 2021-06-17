import { gql } from '@apollo/client';

export const STUDY_FILTERS = gql`
    query GetStudyFilters($studyFilters: JSON) {
        Study {
            aggregations(filters: $studyFilters) {
                name {
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
                donors__observed_phenotype_tagged__main_category {
                    #Type d'anomalie
                    buckets {
                        doc_count
                        key
                    }
                }
                donors__diagnoses__tagged_icd__main_category {
                    #type de maladie (CIM-10)
                    buckets {
                        doc_count
                        key
                    }
                }
                donors__diagnoses__tagged_mondo__main_category {
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
