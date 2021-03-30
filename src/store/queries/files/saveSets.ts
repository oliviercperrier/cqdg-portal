import { gql } from '@apollo/client';

export const GET_ALL_SAVE_SETS = gql`
    query GetAllSaveSets {
        saveSetsFile @rest(path: "/type/save_sets_file", endpoint: "dataStorage", type: "SaveSetsFile") {
            content
        }
        saveSetsDonor @rest(path: "/type/save_sets_donor", endpoint: "dataStorage", type: "SaveSetsDonor") {
            content
        }
    }
`;

export const GET_FILE_FILTER_IDS = gql`
    query GetFileIdsFilter($fileFilters: JSON) {
        File {
            hits(filters: $fileFilters, first: 10000) {
                edges {
                    node {
                        id
                    }
                }
            }
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
