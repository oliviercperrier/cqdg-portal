import React from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse } from 'antd';
import get from 'lodash/get';

import PieChart from 'components/charts/Pie';
import { t } from 'locales/translate';
import { updateQueryFilters } from 'utils/filters';
import { createSubFilter } from 'utils/filters/manipulator';
import { formatPieChart } from 'utils/formatChartData';

const { Panel } = Collapse;

import styles from './Summary.module.scss';
interface ISummary {
    data: any;
}
const Summary: React.FC<ISummary> = ({ data }) => {
    const history = useHistory();
    const pieChartCommonProps = {
        height: 160,
        onMouseMove: (_: any, event: any) => (event.target.style.cursor = 'pointer'),
        width: 160,
    };

    const filesGraphData = get(data, 'File.pies', {});
    const donorsGraphData = get(data, 'Donor.pies', {});
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
