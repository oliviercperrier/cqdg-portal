import isEmpty from 'lodash/isEmpty';

export const getQueryBuilderCache = (type: string): any => {
    const items = localStorage.getItem(`query-builder-cache-${type}`);

    if (isEmpty(items)) {
        return {};
    }

    try {
        return JSON.parse(items!);
    } catch (e) {
        return {};
    }
};

export const setQueryBuilderCache = (type: string, items: any): void => {
    localStorage.setItem(`query-builder-cache-${type}`, JSON.stringify(items));
};
