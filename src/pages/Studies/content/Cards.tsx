import React from 'react';

import StudyCard from 'components/layouts/Card/StudyCard';

import styles from './Cards.module.scss';

const Cards = ({ data }: any): React.ReactElement => (
    <div className={styles.container}>
        {data.map((item: any) => (
            <StudyCard
                description={item.node.description}
                title={item.node.name}
                totalDonors={item.node.donors.hits.total}
                totalFiles={item.node.files.hits.total}
            />
        ))}
    </div>
);

export default Cards;
