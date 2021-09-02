import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';

import NotificationComponent, { NotificationType } from 'components/functionnal/Notification';
import { getClinicalData } from 'services/api';

import styles from './DownloadClinicalButton.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDownloadClinicalButton {
    filters: any;
    className?: string;
}
const DownloadClinicalButton: React.FC<IDownloadClinicalButton> = ({ children, className = '', filters }) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const intl = useIntl();
    useEffect(() => {
        if (hasError) {
            NotificationComponent({
                description: intl.formatMessage({ id: 'global.clinicaldata.download.error.description' }),
                duration: 10,
                message: intl.formatMessage({ id: 'global.clinicaldata.download.error.message' }),
                type: NotificationType.Error,
            });
            setHasError(false);
        }
    }, [hasError]);
    return (
        <Button
            className={`${styles.button} ${className}`}
            disabled={loading}
            loading={loading}
            onClick={async () => {
                setLoading(true);
                await getClinicalData(filters).then((res) => {
                    if (!res) {
                        setHasError(!hasError);
                    } else {
                        NotificationComponent({
                            duration: 10,
                            message: intl.formatMessage({ id: 'global.clinicaldata.download.success.message' }),
                            type: NotificationType.Success,
                        });
                    }
                });
                setLoading(false);
            }}
        >
            {children}
        </Button>
    );
};

export default DownloadClinicalButton;
