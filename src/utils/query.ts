import get from 'lodash/get';
import qs from 'query-string';

export const updateQuery = (key: string, value: string, history: any): void => {
    const query = getQuery();
    query[key] = value;

    history.push({
        search: `?${qs.stringify(query)}`,
    });
};

export const readQuery = (key: string, defaultValue = ''): any => {
    const query = getQuery();
    return get(query, key, defaultValue);
};

const getQuery = () => qs.parse(window.location.search);
