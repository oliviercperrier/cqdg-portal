import React from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Divider } from 'antd';
import { t } from 'locales/utils';
import { isAuthenticated } from 'providers/Keycloak/keycloak';

import DatabaseIcon from 'components/Icon/Database';
import ExternalIcon from 'components/Icon/ExternalLink';
import StorageIcon from 'components/Icon/Storage';
import Locale from 'components/Locale';

import './Header.modules.scss';

const Header = (): React.ReactElement => {
    const location = useLocation();
    const { keycloak } = useKeycloak();
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src="/assets/img/logo.svg" />
                </Link>
            </div>

            <div className="header__nav">
                <Link to="/files">
                    <Button
                        className={`menu-item ${location.pathname.includes('/files') ? 'menu-item--active' : ''}`}
                        icon={<DatabaseIcon className="menu-item-icon" />}
                    >
                        {t('nav.file.repo')}
                    </Button>
                </Link>
                <Link to="/studies">
                    <Button
                        className={`menu-item ${location.pathname.includes('/studies') ? 'menu-item--active' : ''}`}
                        icon={<StorageIcon className="menu-item-icon" />}
                    >
                        {t('nav.studies')}
                    </Button>
                </Link>
            </div>

            <div className="header__actions">
                {isAuthenticated() ? (
                    <Button className="logout" onClick={() => keycloak.logout()} type="text">
                        <AiOutlineLogout className="icon" />
                        {t('nav.logout')}
                    </Button>
                ) : (
                    <Link to={{ pathname: '/login', state: { from: location.pathname } }}>
                        <Button className="login" type="text">
                            <AiOutlineLogin className="icon" />
                            {t('nav.login')}
                        </Button>
                    </Link>
                )}
                <Divider className="separator" type="vertical" />
                <Button className="link" href="https://docs.qa.cqdg.ferlab.bio/" target="_blank" type="link">
                    {t('nav.documentation')}
                    <ExternalIcon className="link--icon" />
                </Button>
                <Button className="link" href="https://cqdg.ca/en.html" target="_blank" type="link">
                    {t('nav.website')}
                    <ExternalIcon className="link--icon" />
                </Button>
                <Locale />
            </div>
        </header>
    );
};

export default Header;
