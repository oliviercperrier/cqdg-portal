import React from 'react';
import { BarSvgProps, ResponsiveBar } from '@nivo/bar';

import StackLayout from 'components/layouts/StackLayout';

import { IChartProps } from './types';

import styles from './Bar.module.scss';

interface IBarChartProps extends IChartProps, BarSvgProps {}

const BarChart: React.FC<IBarChartProps> = ({ title, titleClassName = '', ...rest }: any): React.ReactElement => (
    <StackLayout className={styles.container} vertical>
        <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
        <ResponsiveBar
            colors={({ data }) => data.color}
            theme={{
                fontSize: 10,
                textColor: '#486F90',
            }}
            tooltip={({ color, indexValue, value }) => (
                <div>
                    <span className={styles.tooltipColor} style={{ backgroundColor: color }} />
                    {indexValue}: <span className={styles.tooltipValue}>{value}</span>
                </div>
            )}
            {...rest}
        />
    </StackLayout>
);

export default BarChart;
