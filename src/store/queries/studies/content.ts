import { gql } from '@apollo/client';

export const STUDIES_PAGE_DATA = gql`
    query GetStudiesData($offset: Int, $sort: [Sort], $first: Int, $filters: JSON) {
        Study {
            hits(offset: $offset, sort: $sort, first: $first, filters: $filters) {
                total
                edges {
                    node {
                        domain
                        website
                        id
                        name
                        population
                        description
                        donors {
                            hits {
                                total
                            }
                        }
                        files {
                            hits {
                                total
                            }
                        }
                    }
                }
            }
        }
        Donor {
            hits(offset: $offset, sort: $sort, filters: $filters, first: $first) {
                total
            }
        }
    }
`;
