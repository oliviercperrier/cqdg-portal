import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

export const updateQueryParam = (history: any, key: string, value: any): void => {
    const query = getQueryParams();
    if (isEmpty(value) && query[key]) {
        delete query[key];
    } else {
        query[key] = typeof value === 'object' ? JSON.stringify(value) : value;
    }
    history.push({
        search: `?${qs.stringify(query)}`,
    });
};

/*type IQueryParams<T> = {
    key: string;
    defaultValue: T;
};*/

export const readQueryParam = <T = ''>(key: string, defaultValue: T, search: any = null): any => {
    const query = getQueryParams(search);
    return get(query, key, defaultValue);
};

const getQueryParams = (search: any = null) => (search ? qs.parse(search) : qs.parse(window.location.search));
