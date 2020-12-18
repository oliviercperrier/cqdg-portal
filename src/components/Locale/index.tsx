import React from 'react';
import { useQuery } from '@apollo/client';
import { defaultLocale } from 'providers/Intl';
import { setlocale } from 'store/cache/locales';
import { GET_LOCALE } from 'store/queries/locales';

const availableLocales = ['fr', 'en'];
const localesMapping: Record<string, string> = {
    en: 'fr',
    fr: 'en',
};

const Locale = (): React.ReactElement => {
    const {
        data: { locale },
    } = useQuery<any>(GET_LOCALE);
    let selectedLocale = locale;
    if (!availableLocales.includes(selectedLocale)) {
        selectedLocale = defaultLocale;
    }

    return (
        <button
            onClick={() => setlocale(localesMapping[locale])}
        >{`Change language to: ${localesMapping[locale]}`}</button>
    );
};

export default Locale;
