import React from 'react';
import { FormattedMessage } from 'react-intl';

export const flatLocale = (locale: Record<string, any>, path: string[] = [], data: any = {}): any => {
    Object.entries(locale).forEach((d) => {
        const [key, value] = d;
        if (typeof value === 'object') {
            flatLocale(value, path.concat(key), data);
        } else {
            data[path.concat(key).join('.')] = value;
        }
    });
    return data;
};

export const t = (key: string, values = {}, defaultMessage = ''): React.ReactElement => {
    const newKey = key.replace('__', '.');
    return <FormattedMessage defaultMessage={defaultMessage} id={newKey} values={values} />;
};
