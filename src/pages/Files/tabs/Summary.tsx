import React from 'react';
import { useQuery } from '@apollo/client';
import { Collapse, Spin } from 'antd';
import get from 'lodash/get';

import PieChart from 'components/charts/Pie';
import { t } from 'locales/translate';
import { FILE_SUMMARY_DATA } from 'store/queries/files/summary';
import { formatPieChart } from 'utils/formatChartData';

const { Panel } = Collapse;

import styles from './Summary.module.scss';
const Summary = (): React.ReactElement => {
    const { data, loading } = useQuery(FILE_SUMMARY_DATA);
    const pieChartCommonProps = { height: 160, width: 160 };

    if (loading) {
        return <Spin />;
    }

    const filesGraphData = get(data, 'File.pies', {});
    const donorsGraphData = get(data, 'Donor.pies', {});
    return (
        <Collapse defaultActiveKey={[1, 2]}>
            <Panel header={t('global.files.title')} key={`1`}>
                <div className={styles.graphContainers}>
                    {Object.keys(filesGraphData).map((key) => (
                        <PieChart
                            className={styles.graph}
                            data={formatPieChart(get(filesGraphData, `${key}.buckets`), 'key', 'doc_count')}
                            title={t(`aggregation.${key}`)}
                            titleClassName={styles.title}
                            {...pieChartCommonProps}
                        />
                    ))}
                </div>
            </Panel>
            <Panel header={t('global.donors.title')} key={`2`}>
                <div className={styles.graphContainers}>
                    {Object.keys(donorsGraphData).map((key) => (
                        <PieChart
                            className={styles.graph}
                            data={formatPieChart(get(donorsGraphData, `${key}.buckets`), 'key', 'doc_count')}
                            title={t(`aggregation.${key}`)}
                            titleClassName={styles.title}
                            {...pieChartCommonProps}
                        />
                    ))}
                </div>
            </Panel>
        </Collapse>
    );
};

export default Summary;
