export interface IData {
    File?: IIndex;
    Donor?: IIndex;
    Study?: IIndex;
}

export interface IIndex {
    hits?: {
        edges?: INode[];
    };
    aggregations?: {
        __typename: string;
        [key: string]: any;
    };
    extended: JSON;
    mapping: JSON;
}

export interface INode {
    node: INodeData;
}

export interface INodeData {
    [key: string]: any;
}
