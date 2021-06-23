import get from 'lodash/get';

import { INode } from 'types/interface/data';
import { Hits } from 'utils/graphql/query';

export const getDataWithKey = (data: INode[], indexData: string, lookupKey: string): INode[] => {
    const currentData: INode[] = get(data, `${indexData}.${Hits.COLLECTION}`, []);
    return currentData.map((item) => ({ ...item, key: item.node[lookupKey] }));
};
