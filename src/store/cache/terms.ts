import { makeVar } from '@apollo/client';

export const isTermsAccepted = (): boolean => Boolean(sessionStorage.getItem('terms')) || false;
export const setTerms = (value: boolean): void => {
    terms(value);
    sessionStorage.setItem('terms', String(value));
};

export const terms = makeVar<boolean>(isTermsAccepted());
