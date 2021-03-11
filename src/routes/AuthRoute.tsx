import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';

import AppLayout from 'layouts/App';
import { isAuthenticated } from 'providers/Keycloak/keycloak';

interface AuthRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>;
}

export default ({ component: Component, ...rest }: AuthRouteProps): React.ReactElement => {
    const { initialized, keycloak } = useKeycloak();
    const isAuthorized = isAuthenticated(keycloak);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthorized ? (
                    <AppLayout>
                        <Component {...props} />
                    </AppLayout>
                ) : !initialized ? (
                    <Spin spinning />
                ) : (
                    !isAuthorized && <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
                )
            }
        />
    );
};
