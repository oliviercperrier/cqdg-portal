import React from 'react';
import { Button } from 'antd';

import { getClinicalData } from 'services/api';

import styles from './DownloadClinicalButton.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDownloadClinicalButton {
    filters: any;
}
const DownloadClinicalButton: React.FC<IDownloadClinicalButton> = ({ children, filters }) => (
    <div className={styles.container}>
        <Button className={styles.button} onClick={() => getClinicalData(filters)}>
            {children}
        </Button>
    </div>
);

export default DownloadClinicalButton;
