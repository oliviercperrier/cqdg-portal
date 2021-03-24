import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import xss, { IFilterXSSOptions } from 'xss';

const xssConfig: IFilterXSSOptions = {
    // empty, means filter out all tags
    stripIgnoreTag: true,
    // filter out all HTML not in the whitelist
    stripIgnoreTagBody: ['script'],
    whiteList: {}, // the script tag is a special case, we need
    // to filter out its content
};

export const updateQueryParam = (history: any, key: string, value: any): void => {
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

interface IValues<T> {
    defaultValue: T;
    whiteList?: Array<T>;
}
export const readQueryParam = <T = ''>(key: string, options: IValues<T>, search: any = null): T => {
    const query = getQueryParams(search);
    let result = get<any, any, T>(query, key, options.defaultValue)!;
    result = xss(result, xssConfig);
    if (!isEmpty(options.whiteList) && !options.whiteList!.includes(result)) {
        result = options.defaultValue;
    }

    return result;
};

const getQueryParams = (search: any = null) => (search ? qs.parse(search) : qs.parse(window.location.search));
