import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILES } from 'store/queries/fileRepo';

import Header from 'components/Header';

const FileRepo = () => {
    const { data, error, loading } = useQuery<any>(GET_FILES);
    return (
        <>
            <div>
                <Header />
            </div>
            <div>FileRepo Page</div>
        </>
    );
};

export default FileRepo;
