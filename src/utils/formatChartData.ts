interface IChart {
    id: string;
    value: string;
    color?: string;
}

export const formatPieChart = (data: any, key: string, value: string, colors: string[] = []) => {
    if (data.length === 0) return [];
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
