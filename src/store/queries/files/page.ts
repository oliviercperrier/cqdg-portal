import { gql } from '@apollo/client';

import { FILE_DATA } from 'store/queries/fragments/file';

export const FILE_PAGE_DATA = gql`
    query GetFileData(
        $fileOffset: Int
        $fileFirst: Int
        $donorOffset: Int
        $donorFirst: Int
        $fileFilters: JSON
        $donorFilters: JSON
        $studyFilters: JSON
    ) {
        File {
            hits(offset: $fileOffset, first: $fileFirst, filters: $fileFilters) {
                total
                edges {
                    node {
                        donors {
                            hits {
                                total
                                edges {
                                    node {
                                        submitter_donor_id
                                    }
                                }
                            }
                        }
                        study {
                            hits {
                                edges {
                                    node {
                                        name
                                        short_name_keyword
                                        study_id_keyword
                                    }
                                }
                            }
                        }
                        ...FileFragment
                    }
                }
            }
            pies: aggregations(filters: $fileFilters, aggregations_filter_themselves: true) {
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

            aggregations(filters: $fileFilters) {
                file_size {
                    stats {
                        sum
                    }
                }
            }
            fileFilters: aggregations(filters: $fileFilters) {
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
        Study {
            pies: aggregations(filters: $studyFilters, aggregations_filter_themselves: true) {
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
            }
            hits(filters: $studyFilters) {
                total
            }
        }
        Donor {
            hits(offset: $donorOffset, filters: $donorFilters, first: $donorFirst) {
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
            donorFilters: aggregations(filters: $donorFilters) {
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
            pies: aggregations(filters: $donorFilters, aggregations_filter_themselves: true) {
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
                familyRelationships__family_type {
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
                vital_status {
                    buckets {
                        doc_count
                        key
                    }
                }
            }
        }
    }
    ${FILE_DATA}
`;
