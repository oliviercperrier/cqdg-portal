import { gql } from '@apollo/client';

export const GET_TERMS = gql`
    query GetTerms {
        terms @client
    }
`;
