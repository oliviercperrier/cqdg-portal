import React from 'react';
import { useQuery } from '@apollo/client';
import DataLayout from 'layouts/DataContent';
import { FILE_PAGE_DATA } from 'store/queries/files/table';

import ContentSeparator from 'components/layouts/ContentSeparator';

const FilesTable = () => {
    const { data, error, loading } = useQuery<any>(FILE_PAGE_DATA);
    //console.log('filesTable', data, error, loading);
    return (
        <DataLayout
            actions={<div>actions</div>}
            summary={
                <ContentSeparator>
                    <div>test1</div>
                    <div>test2</div>
                    <div>test2</div>
                    <div>test2</div>
                    <div>test2</div>
                </ContentSeparator>
            }
        >
            <div>content</div>
        </DataLayout>
    );
};
export default FilesTable;
