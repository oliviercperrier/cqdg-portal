import axios from 'axios';
import get from 'lodash/get';

const API_URL = process.env.REACT_APP_API_URL;
const instance = axios.create({
    baseURL: API_URL,
});

export const getHomeStats = async () => {
    const response = await instance.get(`/stats`);

    return get(response, 'data.viewer.File.aggregations.data_type.buckets', []);
};
