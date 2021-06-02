import React from 'react';

import StudyCard from 'components/layouts/Card/StudyCard';
import { Routes } from 'routes';
import { addFilter } from 'utils/filters/manipulator';

import styles from './Cards.module.scss';

const Cards: React.FC<any> = ({ data }) => (
    <div className={styles.container}>
        {data.map((item: any) => (
            <StudyCard
                description={item.node.description}
                detailsLinkProps={{ params: { id: item.node.study_id_keyword }, path: Routes.STUDY }}
                donorsLinkProps={{
                    filters: addFilter(null, 'study_id_keyword', [item.node.study_id_keyword]),
                    path: Routes.FILES,
                    query: { searchTableTab: 'donors' },
                }}
                filesLinkProps={{
                    filters: addFilter(null, 'study_id_keyword', [item.node.study_id_keyword]),
                    path: Routes.FILES,
                    query: { searchTableTab: 'files' },
                }}
                headerTitle={item.node.study_id_keyword}
                title={item.node.name}
                totalDonors={item.node.donors.hits.total}
                totalFiles={item.node.files.hits.total}
            />
        ))}
    </div>
);

export default Cards;
