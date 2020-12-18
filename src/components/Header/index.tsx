import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from 'providers/Keycloak/keycloak';

import Locale from 'components/Locale';

const Header = () => {
    const location = useLocation();
    return (
        <div>
            <Link to="/">Home page</Link>
            {!isAuthenticated() && (
                <Link to={{ pathname: '/login', state: { from: location.pathname } }}>Login page</Link>
            )}
            <Link to="/files">File Repo page</Link>
            <Locale />
        </div>
    );
};

export default Header;
