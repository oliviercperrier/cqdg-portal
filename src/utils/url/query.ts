import { History } from 'history';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

export const updateQueryParam = (history: History, key: string, value: Record<string, any> | string): void => {
    const query = getQueryParams();
    if (isEmpty(value) && !query[key]) {
        return;
    }
    if (isEmpty(value) && query[key]) {
        delete query[key];
    } else {
        query[key] = typeof value === 'object' ? JSON.stringify(value) : value;
    }
    history.push({
        search: `?${qs.stringify(query)}`,
    });
};

interface IQueryParams {
    [key: string]: string | any;
}

export const createQueryParams = (queryParams: IQueryParams): string => {
    const query: Record<string, string> = {};
    for (const queryKey in queryParams) {
        if (typeof queryParams[queryKey] === 'object') {
            query[queryKey] = JSON.stringify(queryParams[queryKey]);
        } else {
            query[queryKey] = queryParams[queryKey] as string;
        }
    }

    return `?${qs.stringify(query)}`;
};

const getQueryParams = (search: any = null) => (search ? qs.parse(search) : qs.parse(window.location.search));
