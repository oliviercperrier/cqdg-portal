import { IS_DEV_ENV, IS_QA_ENV } from 'config/constants';

export const getDocsEnvDomain = (): string => {
    if (IS_DEV_ENV) {
        return 'http://localhost:3001';
    }

    if (IS_QA_ENV) {
        return 'https://docs.qa.cqdg.ferlab.bio';
    }

    return '';
};
