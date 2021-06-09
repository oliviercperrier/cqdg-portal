import { saveAs } from 'file-saver';
import get from 'lodash/get';
import { json2tsv } from 'tsv-json';

import { translate } from 'locales/translate';
import { ITableColumnItem } from 'types/interface';
import { INode } from 'types/interface/data';

interface IDownloadType {
    [key: string]: string;
}

const downloadType: IDownloadType = {
    BLOB: 'octet/stream',
    CSV: 'text/csv',
    JSON: 'application/json',
    TSV: 'text/tab-separated-values',
    XML: 'text/xml',
};

export const download = (body: string, format: string, filename: string): void => {
    const type = downloadType[format.toUpperCase()];

    saveAs(new Blob([body], { type }), filename);
};

export const formatToTSV = (columns: ITableColumnItem[], data: INode[]): string => {
    const headerColumns = columns.map((columnData: ITableColumnItem) => translate(columnData.translate));
    const formatedData: string[][] = data.map((datum: INode) => {
        const aggData: any = [];
        columns.forEach((dataColumn: any) => {
            let dataToUse = String(get(datum.node, dataColumn.id, ''));
            if (dataColumn.download) {
                dataToUse = String(dataColumn.download(datum));
            }
            aggData.push(dataToUse);
        });

        return aggData;
    });
    formatedData.unshift(headerColumns);
    return json2tsv(formatedData);
};
