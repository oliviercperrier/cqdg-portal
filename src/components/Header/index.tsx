// TODO fix ternary indent between prettier and eslint
/* eslint-disable prettier/prettier */
import React from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { isAuthenticated } from 'providers/Keycloak/keycloak';

import DatabaseIcon from 'components/Icon/Database';
import ExternalIcon from 'components/Icon/ExternalLink';
import StorageIcon from 'components/Icon/Storage';
import Locale from 'components/Locale';

import './Header.modules.scss';

const Header = (): React.ReactElement => {
    const location = useLocation();
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src="/assets/img/logo.svg" />
                </Link>
            </div>

            <div className="header__nav">
                <Link to="/files">
                    <Button className="menu-item" icon={<DatabaseIcon className="menu-item-icon" />}>
                        Répertoire de fichiers
                    </Button>
                </Link>
                <Link to="/studies">
                    <Button className="menu-item" icon={<StorageIcon className="menu-item-icon" />}>
                        Études
                    </Button>
                </Link>
            </div>

            <div className="header__actions">
                {isAuthenticated() ? (
                    <Link className="header__actions--logout" to={{ pathname: '/logout', state: { from: location.pathname } }}>
                        <Button type="text">
                            <AiOutlineLogout className="icon" />
                            Déconnexion
                        </Button>
                    </Link>
                ) : (
                        <Link className="header__actions--login" to={{ pathname: '/login', state: { from: location.pathname } }}>
                            <Button type="text">
                                <AiOutlineLogin className="icon" />
                                Connexion
                            </Button>
                        </Link>
                    )}
                <Divider className="separator" type="vertical" />
                <Button className="link" href="https://docs.qa.cqdg.ferlab.bio/" target="_blank" type="link">
                    Documentation
                    <ExternalIcon className="link--icon" />
                </Button>
                <Button className="link" href="https://cqdg.ca/en.html" target="_blank" type="link">
                    Site Web
                    <ExternalIcon className="link--icon" />
                </Button>
                <Locale />
            </div>
        </header>
    );
};

export default Header;
