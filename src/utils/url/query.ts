import get from 'lodash/get';
import qs from 'query-string';

export const updateQueryParam = (key: string, value: string, history: any): void => {
    const query = getQueryParams();
    query[key] = value;

    history.push({
        search: `?${qs.stringify(query)}`,
    });
};

export const readQueryParam = (key: string, defaultValue = ''): any => {
    const query = getQueryParams();
    return get(query, key, defaultValue);
};

const getQueryParams = () => qs.parse(window.location.search);
