import { gql } from '@apollo/client';

import { FILE_DATA } from 'store/queries/fragments/file';

export const FILE_TAB_DATA = gql`
    query GetFileTabData($offset: Int, $sort: [Sort], $first: Int, $fileFilters: JSON) {
        File {
            hits(offset: $offset, sort: $sort, first: $first, filters: $fileFilters) {
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
            aggregations(filters: $fileFilters) {
                file_size {
                    stats {
                        sum
                    }
                }
            }
        }
    }
    ${FILE_DATA}
`;
