import React from 'react';
import { useQuery } from '@apollo/client';
import QueryLayout from 'layouts/Query';
import { GET_FILES } from 'store/queries/fileRepo';

const Study = () => {
    const { data, error, loading } = useQuery<any>(GET_FILES);
    return (
        <QueryLayout filters={{ donors: <div>donor filters</div>, files: <div>file filters</div> }}>
            <div>content</div>
        </QueryLayout>
    );
};

export default Study;
