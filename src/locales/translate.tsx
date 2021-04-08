import React from 'react';
import { createIntl, FormattedMessage } from 'react-intl';

import translations from 'locales';
import { getLocale } from 'store/cache/locales';

export const t = (key: string, values = {}, defaultMessage = ''): React.ReactElement => {
    const newKey = key.replace('__', '.');
    return <FormattedMessage defaultMessage={defaultMessage} id={newKey} values={values} />;
};

export const translate = (key: string) => {
    if (!key) {
        return '';
    }
    const locale = getLocale();
    const intl = createIntl({
        locale: locale,
        messages: translations[locale],
        onError: (f) => f,
    });

    return intl.formatMessage({ id: key });
};
