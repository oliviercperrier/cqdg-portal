import axios from 'axios';
import dateformat from 'dateformat';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { CLINICAL_DATA_API, GRAPHQL_API } from 'config/constants';
import { getToken } from 'providers/Keycloak/keycloak';
import { ISqonGroupFilter } from 'types/interface/filters';
import { getDefaultFilters } from 'utils/filters';
import { downloadFile } from 'utils/url/download';

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

export const getClinicalData = async (filters: ISqonGroupFilter) => {
    const token = getToken();
    const data = isEmpty(filters) ? getDefaultFilters() : filters;
    return await clinicalRestAPI
        .post(`/download/clinical`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        })
        .then((res) => {
            if (res.status === 200) {
                const now = new Date();
                const dateFormatted = dateformat(now, 'yyyy-mm-dd-HH:MM:ss');
                downloadFile(res.data, `clinical-data-${dateFormatted}.zip`);
            }
            return true;
        })
        .catch((e) => {
            console.error(e);
            return false;
        });
};

export const getRequestAccessFilesByStudyID = async (studyID: string): Promise<boolean> => {
    const token = getToken();
    const response = await appRestAPI.get(`/request/access/${studyID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    });
    if (response.status === 200) {
        const now = new Date();
        const dateFormatted = dateformat(now, 'yyyy-mm-dd-HH:MM:ss');
        downloadFile(response.data, `request-access-${studyID}-${dateFormatted}.zip`);
    }

    return true;
};

export const getManifestFilesByStudyID = async (studyID: string): Promise<boolean> => {
    const token = getToken();
    const response = await appRestAPI.get(`/request/manifest/${studyID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    });
    if (response.status === 200) {
        const now = new Date();
        const dateFormatted = dateformat(now, 'yyyy-mm-dd-HH:MM:ss');
        downloadFile(response.data, `manifest-${studyID}-${dateFormatted}.zip`);
    }

    return true;
};
