import { gql } from '@apollo/client';
import { FILE_DATA } from 'store/queries/files';

export const FILE_PAGE_DATA = gql`
    query GetFilePageData($hitsOffset: Int, $hitsSort: [Sort], $hitsFirst: Int, $hitsFilters: JSON) {
        File {
            hits(offset: $hitsOffset, sort: $hitsSort, first: $hitsFirst, filters: $hitsFilters) {
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
        }
    }
    ${FILE_DATA}
`;
