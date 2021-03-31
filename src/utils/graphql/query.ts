import {
    DocumentNode,
    OperationVariables,
    QueryHookOptions,
    QueryResult,
    TypedDocumentNode,
    useQuery,
} from '@apollo/client';

export enum Hits {
    COLLECTION = 'hits.edges',
    SINGLE_ITEM = 'hits.edges[0].node',
    ITEM = 'hits',
}

interface IBaseQueryResults<TData, TVariables> extends Omit<QueryResult<TData, TVariables>, 'data'> {
    result: TData | undefined;
}

export const useLazyResultQuery = <TData = any, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): IBaseQueryResults<TData, TVariables> => {
    const { data, previousData, ...rest } = useQuery<TData, TVariables>(query, options);

    let result = previousData;

    if (data) {
        result = data;
    }

    return { result, ...rest };
};
