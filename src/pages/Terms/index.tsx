import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ScrollView from '@ferlab/ui/core/layout/ScrollView';
import { Button } from 'antd';
import qs from 'query-string';

import Footer from 'components/interface/Footer';
import Header from 'components/interface/Header';
import CardContainerNotched from 'components/layouts/Card/CardContainerNotched';
import CardContent from 'components/layouts/Card/CardContent';
import { t } from 'locales/translate';
import { setTerms } from 'store/cache/terms';

import styles from './Terms.module.scss';

const getText = () => {
    const data = [];
    for (let i = 1; i <= 8; i++) {
        data.push(<li key={i}>{t(`terms.${i}`)}</li>);
    }

    return data;
};

const Terms: React.FC = () => {
    const location = useLocation<any>();
    const history = useHistory<any>();
    const from = qs.parse(location.search).redirectAfter || location.state.from || '/files';
    return (
        <div className={styles.container}>
            <Header isNavActive={false} />
            <main className={styles.content}>
                <CardContainerNotched className={styles.modal}>
                    <CardContent className={styles.modalContent}>
                        <div className={styles.heading}>
                            <h1 className={styles.title}>{t('nav.terms')}</h1>
                            <span>{t('global.last.updated.date')}: 13/04/2020</span>
                        </div>
                        <ScrollView className={styles.termContent} vertical>
                            <ol>{getText()}</ol>
                        </ScrollView>
                        <div className={styles.actions}>
                            <Button onClick={() => history.push('/')}>{t('terms.decline')}</Button>
                            <Button
                                onClick={() => {
                                    setTerms(true);
                                    history.push(from);
                                }}
                                type="primary"
                            >
                                {t('terms.accept')}
                            </Button>
                        </div>
                    </CardContent>
                </CardContainerNotched>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
