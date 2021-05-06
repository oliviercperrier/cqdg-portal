import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Bar, BarSvgProps, ResponsiveBar } from '@nivo/bar';

import ChartsIcon from 'components/interface/Icon/Charts';
import { t } from 'locales/translate';
import { addBarChartColor, getCommonColors } from 'utils/formatChartData';

import { IChartProps } from './types';

import styles from './Bar.module.scss';

interface IBarChartProps extends IChartProps, BarSvgProps {
    titleLeftBar?: React.ReactNode;
    titleBottomBar?: React.ReactNode;
    chartContainerClassName?: string;
}
const barColors = getCommonColors();
const BarChart: React.FC<IBarChartProps> = ({
    chartContainerClassName = '',
    className = '',
    data,
    height = 0,
    title,
    titleBottomBar = '',
    titleClassName = '',
    titleLeftBar = '',
    width = 0,
    ...rest
}) => {
    const commonProps: BarSvgProps = {
        colors: ({ data }) => data.color,
        data: addBarChartColor(data, barColors),
        theme: {
            fontSize: 10,
            textColor: '#486F90',
        },
        tooltip: ({ color, indexValue, value }) => (
            <div>
                <span className={styles.tooltipColor} style={{ backgroundColor: color }} />
                {indexValue}: <span className={styles.tooltipValue}>{value}</span>
            </div>
        ),
    };
    return (
        <StackLayout className={`${styles.container} ${className}`} fitContent flexContent vertical>
            <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
            <div className={`${styles.chartContainer} ${chartContainerClassName}`}>
                {titleLeftBar && <span className={styles.titleLeftBar}>{titleLeftBar}</span>}
                {data.length > 0 ? (
                    width > 0 && height > 0 ? (
                        <Bar height={height} width={width} {...commonProps} {...rest} />
                    ) : (
                        <ResponsiveBar {...commonProps} {...rest} />
                    )
                ) : (
                    <StackLayout className={styles.noData} flexContent vertical>
                        <ChartsIcon className={styles.icon} />
                        <span>{t('global.empty')}</span>
                    </StackLayout>
                )}
                {titleBottomBar && <span className={styles.titleBottomBar}>{titleBottomBar}</span>}
            </div>
        </StackLayout>
    );
};

export default BarChart;
