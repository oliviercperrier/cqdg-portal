import React from 'react';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import get from 'lodash/get';

import PieChart from 'components/charts/Pie';
import { t } from 'locales/translate';
import { FILE_SUMMARY_DATA } from 'store/queries/files/summary';
import { formatPieChart } from 'utils/formatChartData';

import styles from './Summary.module.scss';
const Summary = (): React.ReactElement => {
    const { data, loading } = useQuery(FILE_SUMMARY_DATA);

    if (loading) {
        return <Spin />;
    }

    return (
        <div className={styles.container}>
            <PieChart
                data={formatPieChart(get(data, 'File.pies.data_category.buckets'), 'key', 'doc_count')}
                title={t('charts.data_category')}
            />
            <PieChart
                data={formatPieChart(get(data, 'File.pies.data_type.buckets'), 'key', 'doc_count')}
                title={t('charts.data_type')}
            />
            <PieChart
                data={formatPieChart(get(data, 'File.pies.file_format.buckets'), 'key', 'doc_count')}
                title={t('charts.file_format')}
            />
            <PieChart
                data={formatPieChart(get(data, 'Donor.pies.diagnoses__mondo_term_keyword.buckets'), 'key', 'doc_count')}
                title={t('charts.data_category')}
            />
            <PieChart
                data={formatPieChart(get(data, 'Donor.pies.ethnicity.buckets'), 'key', 'doc_count')}
                title={t('charts.data_type')}
            />
            <PieChart
                data={formatPieChart(
                    get(data, 'Donor.pies.phenotypes__hpo_category_keyword.buckets'),
                    'key',
                    'doc_count'
                )}
                title={t('charts.file_format')}
            />
            <PieChart
                data={formatPieChart(get(data, 'Donor.pies.study__short_name_keyword.buckets'), 'key', 'doc_count')}
                title={t('charts.study')}
            />
        </div>
    );
};

export default Summary;
