import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { isEmptySqon } from '@ferlab/ui/core/data/sqon/utils';
import isEmpty from 'lodash/isEmpty';

import { noDuplicate } from 'utils/duplicate';

interface IData {
    [key: string]: IContent[];
}

interface IContent {
    content: {
        ids: string[];
        name: string;
    };
}
const validKey = ['savesets.file', 'savesets.donor'];
export const remapFilterToSaveSets = (data: IData, filters: ISqonGroupFilter): ISqonGroupFilter | null => {
    if (isEmpty(filters) || isEmptySqon(filters)) {
        return filters;
    }

    const remappedSaveSetsFilters = filters.content.map((item: any) => {
        if (validKey.includes(item.content.field)) {
            const key = item.content.field.split('.')[1];
            let result: any = [];
            const dataToUse = data[key];
            dataToUse.forEach((dataItem) => {
                if (item.content.value.includes(dataItem.content.name)) {
                    result = noDuplicate(result, dataItem.content.ids);
                }
            });
            return { content: { ...item.content, value: result }, op: item.op };
        }

        return item;
    });

    return { content: remappedSaveSetsFilters, op: filters.op };
};
