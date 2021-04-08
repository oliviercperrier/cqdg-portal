import React from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse } from 'antd';
import get from 'lodash/get';

import PieChart from 'components/charts/Pie';
import { t } from 'locales/translate';
import { FILE_SUMMARY_DATA } from 'store/queries/files/summary';
import { updateQueryFilters } from 'utils/filters';
import { createSubFilter } from 'utils/filters/manipulator';
import { useFilters } from 'utils/filters/useFilters';
import { formatPieChart } from 'utils/formatChartData';
import { useLazyResultQuery } from 'utils/graphql/query';

const { Panel } = Collapse;

import styles from './Summary.module.scss';
const Summary = (): React.ReactElement => {
    const history = useHistory();

    const { mappedFilters } = useFilters();
    const { result } = useLazyResultQuery(FILE_SUMMARY_DATA, {
        variables: mappedFilters,
    });
    const pieChartCommonProps = {
        height: 160,
        onMouseMove: (_: any, event: any) => (event.target.style.cursor = 'pointer'),
        width: 160,
    };

    const filesGraphData = get(result, 'File.pies', {});
    const donorsGraphData = get(result, 'Donor.pies', {});
    return (
        <Collapse defaultActiveKey={[1, 2]}>
            <Panel header={t('global.files.title')} key={`1`}>
                <div className={styles.graphContainers}>
                    {Object.keys(filesGraphData)
                        .filter((key) => key !== '__typename')
                        .map((key) => (
                            <PieChart
                                className={styles.graph}
                                data={formatPieChart(get(filesGraphData, `${key}.buckets`), 'key', 'doc_count')}
                                onClick={(datum) =>
                                    updateQueryFilters(history, key, createSubFilter(key, [datum.id as string]))
                                }
                                title={t(`aggregation.${key}`)}
                                titleClassName={styles.title}
                                {...pieChartCommonProps}
                            />
                        ))}
                </div>
            </Panel>
            <Panel header={t('global.donors.title')} key={`2`}>
                <div className={styles.graphContainers}>
                    {Object.keys(donorsGraphData)
                        .filter((key) => key !== '__typename')
                        .map((key) => (
                            <PieChart
                                className={styles.graph}
                                data={formatPieChart(get(donorsGraphData, `${key}.buckets`), 'key', 'doc_count')}
                                onClick={(datum) =>
                                    updateQueryFilters(history, key, createSubFilter(key, [datum.id as string]))
                                }
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
