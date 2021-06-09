import React from 'react';
import { IntlProvider } from 'react-intl';
import { useQuery } from '@apollo/client';

import { IS_DEV_ENV } from 'config/constants';
import translations from 'locales';
import { GET_LOCALE } from 'store/queries/locales';

export const defaultLocale = 'en';

const intlErrorHandler = () => {
    if (IS_DEV_ENV) {
        //console.log(error);
    }
};

const intl: React.FC = ({ children }) => {
    const {
        data: { locale },
    } = useQuery<any>(GET_LOCALE);

    const selectedTranslation = translations[locale];
    return (
        <IntlProvider
            defaultLocale={defaultLocale}
            locale={locale}
            messages={selectedTranslation}
            onError={intlErrorHandler}
        >
            {children}
        </IntlProvider>
    );
};

export default intl;
