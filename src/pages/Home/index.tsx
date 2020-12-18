import React, { useEffect, useState } from 'react';
import { t } from 'locales/utils';
import { getHomeStats } from 'services/api';

import Header from 'components/Header';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getHomeStats();
            setData(data);
        };
        fetchData();
    }, []);
    return (
        <div>
            <Header />
            {t('home.hero.title')}
        </div>
    );
};

export default Home;
