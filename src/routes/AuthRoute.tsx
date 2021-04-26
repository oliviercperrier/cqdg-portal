import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';

import { isAuthenticated } from 'providers/Keycloak/keycloak';
import RedirectTerms from 'utils/routes/RedirectTerms';

interface AuthRouteProps extends RouteProps {
    layout?: React.FC<any>;
    layoutProps?: Record<string, any>;
    component: React.ComponentType<RouteComponentProps<any>>;
    hasToAcceptTerms?: boolean;
}

export default ({
    component: Component,
    hasToAcceptTerms = true,
    layout: Layout = ({ children }) => children,
    layoutProps = {},
    ...rest
}: AuthRouteProps): React.ReactElement => {
    const { initialized, keycloak } = useKeycloak();
    const isAuthorized = isAuthenticated(keycloak);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthorized ? (
                    hasToAcceptTerms ? (
                        <RedirectTerms redirectAfter={props.location.pathname}>
                            <Layout {...layoutProps}>
                                <Component {...props} />
                            </Layout>
                        </RedirectTerms>
                    ) : (
                        <Layout {...layoutProps}>
                            <Component {...props} />
                        </Layout>
                    )
                ) : !initialized ? (
                    <Spin spinning />
                ) : (
                    !isAuthorized && <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
                )
            }
        />
    );
};
