import React from 'react';
import { useQuery } from '@apollo/client';
import QueryLayout from 'layouts/Query';

//import { GET_FILES } from 'store/queries/files';
import BorderedContainer from 'components/container/BorderedContainer';
import QueryBuilder from 'components/functionnal/QueryBuilder';
import StackLayout from 'components/layouts/StackLayout';

import './Studies.scss';

const Study = (): React.ReactElement => (
    //const { data, error, loading } = useQuery<any>(GET_FILES);
    <QueryLayout className="study-repo" filters={{ donors: <div>donor filters</div>, files: <div>file filters</div> }}>
        <QueryBuilder />
        <StackLayout grow vertical>
            <BorderedContainer className="study-repo__graphs">graphs</BorderedContainer>
            <BorderedContainer grow>content</BorderedContainer>
        </StackLayout>
    </QueryLayout>
);
export default Study;
