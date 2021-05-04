import React from 'react';

import StudyCard from 'components/layouts/Card/StudyCard';
import { Routes } from 'routes';

import styles from './Cards.module.scss';

const Cards = ({ data }: any): React.ReactElement => (
    <div className={styles.container}>
        {data.map((item: any) => (
            <StudyCard
                description={item.node.description}
                linkProp={{ params: { id: item.node.study_id_keyword }, path: Routes.STUDY }}
                title={item.node.name}
                totalDonors={item.node.donors.hits.total}
                totalFiles={item.node.files.hits.total}
            />
        ))}
    </div>
);

export default Cards;
