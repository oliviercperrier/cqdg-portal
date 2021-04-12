import React, { useState } from 'react';
import { Button } from 'antd';

import { getClinicalData } from 'services/api';

import styles from './DownloadClinicalButton.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDownloadClinicalButton {
    filters: any;
    className?: string;
}
const DownloadClinicalButton: React.FC<IDownloadClinicalButton> = ({ children, className = '', filters }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className={`${styles.container} ${className}`}>
            <Button
                className={styles.button}
                disabled={loading}
                loading={loading}
                onClick={async () => {
                    setLoading(true);
                    await getClinicalData(filters);
                    setLoading(false);
                }}
            >
                {children}
            </Button>
        </div>
    );
};

export default DownloadClinicalButton;
