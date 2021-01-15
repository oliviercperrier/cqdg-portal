import { gql } from '@apollo/client';
import { FILE_DATA } from 'store/queries/files';

export const FILE_PAGE_DATA = gql`
    query GetFilePageData($offset: Int, $sort: [Sort], $first: Int, $filters: JSON) {
        File {
            hits(offset: $offset, sort: $sort, first: $first, filters: $filters) {
                total
                edges {
                    node {
                        donors {
                            hits {
                                total
                            }
                        }
                        study {
                            hits {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                        ...FileFragment
                    }
                }
            }
            aggregations(filters: $filters) {
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
