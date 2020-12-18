import { makeVar } from '@apollo/client';

const getLocale = (): string => localStorage.getItem('locales') || navigator.language.split('-')[0];
export const setlocale = (locale: string): void => {
    locales(locale);
    localStorage.setItem('locales', locale);
};

export const locales = makeVar<string>(getLocale());
