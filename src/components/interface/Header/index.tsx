import React from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Divider } from 'antd';

import Locale from 'components/functionnal/Locale';
import DatabaseIcon from 'components/interface/Icon/Database';
import ExternalIcon from 'components/interface/Icon/ExternalLink';
import StorageIcon from 'components/interface/Icon/Storage';
import { t } from 'locales/translate';
import { isAuthenticated } from 'providers/Keycloak/keycloak';
import { destroyTokens } from 'providers/Keycloak/tokens';
import { IClassNameProp } from 'types/generic';

import '@ferlab/style/themes/cqdg/components/header.scss';

const Header: React.FC<IClassNameProp> = ({ className = '' }) => {
    const location = useLocation();
    const { keycloak } = useKeycloak();
    return (
        <header className={`header ${className}`}>
            <div className="header__logo">
                <Link to="/">
                    <img src="/assets/img/logo.svg" />
                </Link>
            </div>

            <div className="header__nav">
                <Link
                    className={`ant-btn menu-item ${location.pathname.includes('/files') ? '--active' : ''}`}
                    to="/files"
                >
                    <DatabaseIcon className="menu-item-icon" /> {t('nav.file.repo')}
                </Link>
                <Link
                    className={`ant-btn menu-item ${location.pathname.includes('/studies') ? '--active' : ''}`}
                    to="/studies"
                >
                    <StorageIcon className="menu-item-icon" />
                    {t('nav.studies')}
                </Link>
            </div>

            <div className="header__actions">
                {isAuthenticated(keycloak) ? (
                    <Button
                        className="logout"
                        onClick={() => {
                            destroyTokens();
                            keycloak.logout({
                                redirectUri: window.location.origin,
                            });
                        }}
                        type="text"
                    >
                        <AiOutlineLogout className="icon" />
                        {t('nav.logout')}
                    </Button>
                ) : (
                    <Link className="ant-btn ant-btn-text login" to={{ pathname: '/login', state: { from: '/files' } }}>
                        <AiOutlineLogin className="icon" />
                        {t('nav.login')}
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
