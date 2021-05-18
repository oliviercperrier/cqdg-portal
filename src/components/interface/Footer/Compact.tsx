import React from 'react';
import { useIntl } from 'react-intl';
import { Button, Divider } from 'antd';

import { t } from 'locales/translate';

import styles from './Compact.module.scss';

const Compact = () => {
    const intl = useIntl();

    return (
        <footer className={styles.container}>
            <Button className={styles.link} href="mailto:support@cqdg.ca" type="link">
                {t('short_footer.info')}
            </Button>
            <Divider className="spacer" type="vertical" />
            <Button
                className={styles.link}
                href={intl.formatMessage({ id: 'footer.logo.genome.link' })}
                target="_blank"
                type="link"
            >
                Génome Québec
            </Button>
            <Divider className="spacer" type="vertical" />
            <Button
                className={styles.link}
                href={intl.formatMessage({ id: 'footer.logo.chusj.link' })}
                target="_blank"
                type="link"
            >
                CHU Sainte-Justine
            </Button>
        </footer>
    );
};

export default Compact;
