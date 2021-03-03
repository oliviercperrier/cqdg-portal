import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { Routes } from 'routes';
import { createQueryFilters, ISimpleFilters } from 'utils/url/filters';
import { createQueryParams } from 'utils/url/query';

interface IQueryProp {
    [key: string]: string;
}

interface IInternalLink {
    path: Routes;
    query?: IQueryProp;
    filters: ISimpleFilters;
}

const InternalLink: React.FC<IInternalLink> = ({ children, filters, path, query = {} }) => {
    const queryFilters = createQueryFilters(filters);
    const realPath = `${path}${createQueryParams({ ...query, filters: queryFilters })}`;
    return (
        <Button type="link">
            <Link to={realPath}>{children}</Link>
        </Button>
    );
};

export default InternalLink;
