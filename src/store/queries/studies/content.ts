import { gql } from '@apollo/client';

export const STUDIES_PAGE_DATA = gql`
    query GetStudiesData($offset: Int, $sort: [Sort], $first: Int, $studyFilters: JSON, $donorFilters: JSON) {
        Study {
            hits(offset: $offset, sort: $sort, first: $first, filters: $studyFilters) {
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
            hits(offset: $offset, sort: $sort, filters: $donorFilters, first: $first) {
                total
            }
        }
    }
`;
