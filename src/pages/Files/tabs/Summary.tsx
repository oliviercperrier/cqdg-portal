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

    return (
        <Collapse defaultActiveKey={[1, 2]}>
            <Panel header={t('global.files.title')} key={`1`}>
                <div className={styles.graphContainers}>
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(get(data, 'File.pies.data_category.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_category')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(get(data, 'File.pies.data_type.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_type')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(get(data, 'File.pies.file_format.buckets'), 'key', 'doc_count')}
                        title={t('charts.file_format')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(
                            get(data, 'Donor.pies.diagnoses__mondo_term_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.data_category')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(get(data, 'Donor.pies.ethnicity.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_type')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(
                            get(data, 'Donor.pies.phenotypes__hpo_category_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.file_format')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                    <PieChart
                        className={styles.graph}
                        data={formatPieChart(
                            get(data, 'Donor.pies.study__short_name_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.study')}
                        titleClassName={styles.title}
                        {...pieChartCommonProps}
                    />
                </div>
            </Panel>
            <Panel header={t('global.donors.title')} key={`2`}>
                <div className={styles.graphContainers}>
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(get(data, 'File.pies.data_category.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_category')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(get(data, 'File.pies.data_type.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_type')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(get(data, 'File.pies.file_format.buckets'), 'key', 'doc_count')}
                        title={t('charts.file_format')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(
                            get(data, 'Donor.pies.diagnoses__mondo_term_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.data_category')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(get(data, 'Donor.pies.ethnicity.buckets'), 'key', 'doc_count')}
                        title={t('charts.data_type')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(
                            get(data, 'Donor.pies.phenotypes__hpo_category_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.file_format')}
                        titleClassName={styles.title}
                    />
                    <PieChart
                        className={styles.graph}
                        {...pieChartCommonProps}
                        data={formatPieChart(
                            get(data, 'Donor.pies.study__short_name_keyword.buckets'),
                            'key',
                            'doc_count'
                        )}
                        title={t('charts.study')}
                        titleClassName={styles.title}
                    />
                </div>
            </Panel>
        </Collapse>
    );
};

export default Summary;
