import { makeVar } from '@apollo/client';

export const isTermsAccepted = (): boolean => Boolean(localStorage.getItem('terms')) || false;
export const setTerms = (value: boolean): void => {
    terms(value);
    localStorage.setItem('terms', String(value));
};

export const terms = makeVar<boolean>(isTermsAccepted());
