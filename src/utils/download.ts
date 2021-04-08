/*import { saveAs } from 'file-saver';*/
import get from 'lodash/get';
/*import { json2tsv } from 'tsv-json';

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
    const dataColumns = columns.map((columnData: any) => columnData.id);
    const formatedData = data.map((datum: any) => {
        const aggData: any = [];
        dataColumns.forEach((dataColumn: any) => {
            aggData.push(String(get(datum.node, dataColumn, '')));
        });

        return aggData;
    });
    return json2tsv(formatedData);
};*/
