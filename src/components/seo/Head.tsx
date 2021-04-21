import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

type PageNameType = {
    [key in string]: string;
};

const PageTranslation: PageNameType = {
    files: 'nav.file.repo',
    home: 'nav.home',
    login: 'nav.login',
    logout: 'nav.login',
    studies: 'nav.studies',
    study: 'nav.studies',
    terms: 'nav.terms',
};

interface IHeadProps {
    pageName: string;
}

const Head = ({ pageName }: IHeadProps): React.ReactElement => {
    const intl = useIntl();
    const selectedPage = isEmpty(pageName) ? 'home' : pageName;
    return (
        <Helmet>
            <meta content={intl.formatMessage({ id: 'global.app.description' })} name="description" />
            <title>{intl.formatMessage({ id: PageTranslation[selectedPage] || 'CQDG' })}</title>
        </Helmet>
    );
};

export default Head;
