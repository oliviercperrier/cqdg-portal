import { gql } from '@apollo/client';

export const GET_ALL_SAVE_SETS = gql`
    query GetAllSaveSets {
        saveSetsFile @rest(path: "/type/save_sets_file", endpoint: "dataStorage", type: "SaveSetsFile") {
            id
            content
            updated_at
        }
        saveSetsDonor @rest(path: "/type/save_sets_donor", endpoint: "dataStorage", type: "SaveSetsDonor") {
            id
            content
            updated_at
        }
    }
`;

export const GET_FILE_FILTER_IDS = gql`
    query GetFileIdsFilter($fileFilters: JSON) {
        File {
            hits(filters: $fileFilters, first: 10000) {
                edges {
                    node {
                        id: internal_file_id
                    }
                }
            }
        }
    }
`;

export const GET_DONOR_FILTER_IDS = gql`
    query GetFileIdsFilter($donorFilters: JSON) {
        Donor {
            hits(filters: $donorFilters, first: 10000) {
                edges {
                    node {
                        id: internal_donor_id
                    }
                }
            }
        }
    }
`;

export const GET_SAVE_SETS_BY_NAME = gql`
    query GetSaveSetsByName($key: String!, $value: String!) {
        saveSets(key: $key, value: $value)
            @rest(path: "/search?key={args.key}&value={args.value}", endpoint: "dataStorage", type: "SaveSets") {
            content
        }
    }
`;

export const SET_SAVE_SET = gql`
    mutation SetSaveSet($content: JSON, $type: String) {
        saveSets(input: $content, type: $type)
            @rest(path: "/type/{args.type}", endpoint: "dataStorage", method: "POST", type: "SaveSets") {
            content
        }
    }
`;

export const UPDATE_SAVE_SET = gql`
    mutation UpdateSaveSet($id: Int!, $content: JSON) {
        saveSets(input: $content, id: $id)
            @rest(path: "/content/{args.id}", endpoint: "dataStorage", method: "PUT", type: "SaveSets") {
            content
        }
    }
`;

export const DELETE_SAVE_SET = gql`
    mutation DeleteSaveSet($id: Int!) {
        saveSets(id: $id)
            @rest(path: "/content/{args.id}", endpoint: "dataStorage", method: "DELETE", type: "SaveSets") {
            content
        }
    }
`;
