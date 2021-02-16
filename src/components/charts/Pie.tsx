import React from 'react';
import { PieSvgProps, ResponsivePie } from '@nivo/pie';

import StackLayout from 'components/layouts/StackLayout';

import { IChartProps } from './types';

import styles from './Pie.module.scss';

interface IPieChartProps extends IChartProps, Omit<PieSvgProps<any>, 'height' | 'width'> {}
const PieChart: React.FC<IPieChartProps> = ({ title, titleClassName = '', ...rest }): React.ReactElement => (
    <StackLayout className={styles.container} vertical>
        <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
        <ResponsivePie
            colors={[
                '#A6CEE3',
                '#1F78B4',
                '#B2DF8A',
                '#33A02C',
                '#FB9A99',
                '#E31A1C',
                '#FDBF6F',
                '#FF7F00',
                '#CAB2D6',
                '#6A3D9A',
                '#FFFF99',
                '#B15928',
            ]}
            enableRadialLabels={false}
            enableSliceLabels={false}
            theme={{
                fontSize: 10,
                textColor: '#486F90',
            }}
            {...rest}
        />
    </StackLayout>
);

export default PieChart;
