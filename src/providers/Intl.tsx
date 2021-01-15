import React, { ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { useQuery } from '@apollo/client';
import translations from 'locales';
import { IProvider } from 'providers';
import { GET_LOCALE } from 'store/queries/locales';

import { IS_DEV_ENV } from 'config/constants';

export const defaultLocale = 'en';

const intlErrorHandler = (error: any) => {
    if (IS_DEV_ENV) {
        //console.log(error);
    }
};

export default ({ children }: IProvider): ReactElement => {
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
