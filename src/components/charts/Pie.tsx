import React from 'react';
import { ResponsivePie } from '@nivo/pie';

import StackLayout from 'components/layouts/StackLayout';

import styles from './Pie.module.scss';
const PieChart = ({ data, legends = [], margin = {}, title }: any): React.ReactElement => (
    <StackLayout className={styles.container} vertical>
        <h3 className={styles.title}>{title}</h3>
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
            data={data}
            enableRadialLabels={false}
            enableSliceLabels={false}
            legends={legends}
            margin={margin}
            theme={{
                fontSize: 10,
                textColor: '#486F90',
            }}
        />
    </StackLayout>
);

export default PieChart;
