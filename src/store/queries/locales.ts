import { gql } from '@apollo/client';

export const GET_LOCALE = gql`
    query GetLocale {
        locale @client
    }
`;
