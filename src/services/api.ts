import axios from 'axios';
import get from 'lodash/get';

import { GRAPHQL_API } from 'config/constants';

const instance = axios.create({
    baseURL: GRAPHQL_API,
});

export const getHomeStats = async () => {
    const response = await instance.get(`/stats`);

    return get(response, 'data.viewer', []);
};
