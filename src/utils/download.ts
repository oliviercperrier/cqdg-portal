import { saveAs } from 'file-saver';
import get from 'lodash/get';
import { json2tsv } from 'tsv-json';

import { translate } from 'locales/translate';

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

export const formatToTSV = (columns: any, data: any): string => {
    const headerColumns = columns.map((columnData: any) => translate(columnData.translate));
    const formatedData: string[][] = data.map((datum: any) => {
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
