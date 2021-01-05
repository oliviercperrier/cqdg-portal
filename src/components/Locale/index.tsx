import React from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { defaultLocale } from 'providers/Intl';
import { setlocale } from 'store/cache/locales';
import { GET_LOCALE } from 'store/queries/locales';

import './Locale.modules.scss';

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
        <Button className="locale" onClick={() => setlocale(localesMapping[locale])} shape="circle">
            {localesMapping[locale].toUpperCase()}
        </Button>
    );
};

export default Locale;
