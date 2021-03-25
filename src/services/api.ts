import axios from 'axios';
import get from 'lodash/get';

import { CLINICAL_DATA_API, GRAPHQL_API } from 'config/constants';
import { getTokens } from 'providers/Keycloak/tokens';

const appRestAPI = axios.create({
    baseURL: GRAPHQL_API,
});
const clinicalRestAPI = axios.create({
    baseURL: CLINICAL_DATA_API,
});

export const getHomeStats = async (): Promise<Record<string, any>> => {
    const response = await appRestAPI.get(`/stats`);

    return get(response, 'data.viewer', []);
};

export const getClinicalData = async (filters: any = { content: [], op: 'and' }) => {
    const { token } = getTokens();
    const response = await clinicalRestAPI.post(`/download/clinical`, filters, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.zip');
    document.body.appendChild(link);
    link.click();
};
