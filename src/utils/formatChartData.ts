import isEmpty from 'lodash/isEmpty';

import { INode } from 'types/interface/data';

interface IChart {
    id: string;
    value: string;
    color?: string;
}

export const formatChartData = (data: INode[], key: string, value: string, colors: string[] = []): IChart[] => {
    if (isEmpty(data)) return [];
    return data
        .filter((item: any) => item[key] !== '__missing__')
        .map((item: any, i: number) => {
            let obj: IChart = { id: item[key], value: item[value] };
            if (colors.length > 0) {
                obj = { ...obj, color: colors[i % (colors.length - 1)] };
            }

            return obj;
        });
};

export const getCommonColors = (): string[] => [
    '#008fc7',
    '#b9bd31',
    '#d06d5e',
    '#ffb600',
    '#36cfc9',
    '#b37feb',
    '#f759ab',
    '#d06d5e',
    '#31bdf2',
    '#ff7a45',
    '#d3adf7',
    '#ffb600',
    '#fb9a99',
    '#6a3d9a',
    '#ff7f00',
    '#1f78b4',
];

export const addBarChartColor = (data: Record<string, any>, colors: string[]): IChart[] =>
    data.map((item: any, i: number) => ({ ...item, color: colors[i % (colors.length - 1)] }));
