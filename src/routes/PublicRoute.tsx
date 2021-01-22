import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import PublicLayout from 'layouts/Public';

const PublicRoute = ({ children, ...rest }: RouteProps): React.ReactElement => (
    <Route {...rest}>
        <PublicLayout>{children}</PublicLayout>
    </Route>
);

export default PublicRoute;
