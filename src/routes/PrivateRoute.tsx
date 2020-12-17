// TODO fix ternary indent between prettier and eslint
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import get from 'lodash/get';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>;
}

export default ({ component: Component, ...rest }: PrivateRouteProps): React.ReactElement => {
    const { keycloak } = useKeycloak();
    const isAuthenticated = get(keycloak, 'authenticated', false);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    );
};
