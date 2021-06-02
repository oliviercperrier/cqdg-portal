import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import qs from 'query-string';

import { DEFAULT_LOGIN_LOCATION } from 'pages/Login';
import { GET_TERMS } from 'store/queries/terms';

interface IRedirectTerms {
    redirectAfter?: string;
}
const RedirectTerms: React.FC<IRedirectTerms> = ({ children, redirectAfter = DEFAULT_LOGIN_LOCATION }): any => {
    const {
        data: { terms },
    } = useQuery<any>(GET_TERMS);
    const location = useLocation();
    const from = qs.parse(location.search).redirectAfter || redirectAfter;

    if (!terms) {
        return <Redirect to={{ pathname: '/terms', state: { from } }} />;
    }

    return children;
};

export default RedirectTerms;
