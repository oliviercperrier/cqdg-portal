export const formatPieChart = (data: any, key: string, value: string) =>
    data.map((item: any) => ({ id: item[key], value: item[value] }));
