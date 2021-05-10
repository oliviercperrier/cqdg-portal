import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';

import BarChart from 'components/charts/Bar';
import PieChart from 'components/charts/Pie';
import { t } from 'locales/translate';
import { updateQueryFilters } from 'utils/filters';
import { createSubFilter } from 'utils/filters/manipulator';
import { formatChartData } from 'utils/formatChartData';

import styles from './Summary.module.scss';
interface ISummary {
    data: any;
    loading: boolean;
}

interface IExtraProps {
    [key: string]: string | number;
}
const studies = ['study__short_name_keyword', 'domain', 'population'];
const demographicData = ['gender', 'ethnicity', 'familyRelationships__family_type'];
const clinicalData = ['vital_status', 'diagnoses__icd_category_keyword', 'phenotypes__hpo_category_keyword'];

const getPieChart = (history: any, data: any, key: string, extraProps: IExtraProps = { height: 100, width: 100 }) => (
    <PieChart
        className={styles.graph}
        data={formatChartData(get(data, `${key}.buckets`), 'key', 'doc_count')}
        onClick={(datum) => updateQueryFilters(history, key, createSubFilter(key, [datum.id as string]))}
        onMouseMove={(_: any, event: any) => (event.target.style.cursor = 'pointer')}
        title={t(`charts.${key}`)}
        titleClassName={styles.title}
        {...extraProps}
    />
);

const Summary: React.FC<ISummary> = ({ data, loading }) => {
    const history = useHistory();
    const filesGraphData = get(data, 'File.pies', {});
    const donorsGraphData = get(data, 'Donor.pies', {});
    const studyGraphData = get(data, 'Study.pies', {});
    const studyDonorGraphData = { ...studyGraphData, ...donorsGraphData };
    return (
        <div className={styles.graphContainers}>
            <Card
                className={cx(styles.cardContainer, styles.studies)}
                loading={loading}
                title={t('global.studies.title')}
            >
                <div className={styles.flexGraphContainer}>
                    {Object.keys(studyDonorGraphData)
                        .filter((key) => key !== '__typename' && studies.includes(key))
                        .map((key) => getPieChart(history, studyDonorGraphData, key))}
                </div>
            </Card>
            <Card
                className={cx(styles.cardContainer, styles.demographic)}
                loading={loading}
                title={t('charts.header.demographic')}
            >
                <div className={styles.flexGraphContainer}>
                    {Object.keys(donorsGraphData)
                        .filter((key) => key !== '__typename' && demographicData.includes(key))
                        .map((key) => getPieChart(history, donorsGraphData, key))}
                </div>
            </Card>
            <Card
                className={cx(styles.cardContainer, styles.clinical)}
                loading={loading}
                title={t('charts.header.clinical')}
            >
                <div className={cx(styles.flexGraphContainer, styles.clinicalContent)}>
                    {Object.keys(donorsGraphData)
                        .filter((key) => key !== '__typename' && clinicalData.includes(key))
                        .map((key, i) => {
                            if (key === 'vital_status') {
                                return getPieChart(history, donorsGraphData, key, {
                                    className: styles[`clinicalContentItem-${i + 1}`],
                                    height: 160,
                                    width: 160,
                                });
                            } else {
                                return (
                                    <BarChart
                                        axisLeft={null}
                                        chartContainerClassName={styles.barChartContainer}
                                        className={styles[`clinicalContentItem-${i + 1}`]}
                                        data={formatChartData(
                                            get(donorsGraphData, `${key}.buckets`),
                                            'key',
                                            'doc_count'
                                        )}
                                        enableGridX
                                        enableGridY={false}
                                        enableLabel={false}
                                        layout="horizontal"
                                        margin={{ bottom: 20, left: 5, right: 10, top: 0 }}
                                        padding={0.5}
                                        title={t(`charts.${key}`)}
                                        titleClassName={styles.title}
                                        titleLeftBar={t(`charts.sideTitle.${key}`)}
                                    />
                                );
                            }
                        })}
                </div>
            </Card>
            <Card
                className={cx(styles.cardContainer, styles.availableClinicalData)}
                loading={loading}
                title={t('charts.header.available.clinical')}
            >
                <div className={styles.availableClinicalContainer}>
                    <BarChart
                        axisBottom={null}
                        chartContainerClassName={styles.availableClinicalContent}
                        data={[
                            { id: 'biospecimen', value: 25 },
                            { id: 'diagnosis', value: 21 },
                            { id: 'phenotype', value: 18 },
                            { id: 'exposure', value: 16 },
                            { id: 'treatment', value: 12 },
                            { id: 'follow-up', value: 11 },
                            { id: 'family relationship', value: 10 },
                            { id: 'family history', value: 7 },
                        ]}
                        enableGridX={false}
                        enableLabel={false}
                        margin={{ bottom: 5, left: 20, right: 10, top: 0 }}
                        padding={0.5}
                        title={t(`charts.available.clinical`)}
                        titleBottomBar={t(`charts.bottomTitle.available.clinical`)}
                        titleClassName={styles.title}
                    />
                </div>
            </Card>
            <Card
                className={cx(styles.cardContainer, styles.availableGenomicData)}
                loading={loading}
                title={t('charts.header.available.genomic')}
            >
                <div className={styles.availableGenomicContainer}>
                    {Object.keys(filesGraphData)
                        .filter((key) => key !== '__typename')
                        .map((key, i) =>
                            getPieChart(history, filesGraphData, key, {
                                className: cx(styles.graph, styles[`availableClinicalContentItem-${i + 1}`]),
                                height: 100,
                                width: 100,
                            })
                        )}
                </div>
            </Card>
        </div>
    );
};

export default Summary;
