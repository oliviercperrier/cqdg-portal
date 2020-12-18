// TODO fix ternary indent between prettier and eslint
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Spin } from 'antd';
import get from 'lodash/get';
import { isAuthenticated } from 'providers/Keycloak/keycloak';


interface AuthRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>;
}

export default ({ component: Component, ...rest }: AuthRouteProps): React.ReactElement => {
    const { initialized } = useKeycloak();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        !initialized ? <Spin spinning /> : !isAuthenticated && <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    );
};
