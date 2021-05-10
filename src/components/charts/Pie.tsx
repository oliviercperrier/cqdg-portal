import React from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Pie, PieSvgProps, ResponsivePie } from '@nivo/pie';

import ChartsIcon from 'components/interface/Icon/Charts';
import { t } from 'locales/translate';
import { getCommonColors } from 'utils/formatChartData';

import { IChartProps } from './types';

import styles from './Pie.module.scss';

interface IPieChartProps extends IChartProps, Omit<PieSvgProps<any>, 'height' | 'width'> {
    className?: string;
    width?: number;
    height?: number;
}
const colors = getCommonColors();
const PieChart: React.FC<IPieChartProps> = ({
    className = '',
    data,
    height = 0,
    title,
    titleClassName = '',
    width = 0,
    ...rest
}) => {
    const commonProps = {
        colors,
        enableArcLabels: false,
        enableArcLinkLabels: false,
        theme: {
            fontSize: 10,
            textColor: '#486F90',
        },
    };
    return (
        <StackLayout className={`${styles.container} ${className}`} fitContent vertical>
            <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
            {data.length > 0 ? (
                width > 0 && height > 0 ? (
                    <Pie data={data} height={height} width={width} {...commonProps} {...rest} />
                ) : (
                    <ResponsivePie data={data} {...commonProps} {...rest} />
                )
            ) : (
                <StackLayout className={styles.noData} flexContent vertical>
                    <ChartsIcon className={styles.icon} />
                    <span>{t('global.empty')}</span>
                </StackLayout>
            )}
        </StackLayout>
    );
};

export default PieChart;
