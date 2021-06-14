import ProgressComponent from 'components/functionnal/Progress';
import { t } from 'locales/translate';

export const dataCategoriesModel = (donorData: any) => [
    { dataIndex: ['node', 'key'], title: t('global.category') },
    { className: 'numerical', dataIndex: ['node', 'files'], title: t('global.files.title') },
    {
        render: ({ node }: any) => {
            if (node.files === 0) {
                return '--';
            }
            return <ProgressComponent total={donorData.files.hits.total} value={node.files} />;
        },

        title: `(n=${donorData.files.hits.total})`,
        width: 85,
    },
];

export const experimentalStrategiesModel = (donorData: any) => [
    { dataIndex: ['node', 'key'], title: t('global.strategy') },
    { className: 'numerical', dataIndex: ['node', 'files'], title: t('global.files.title') },
    {
        render: ({ node }: any) => {
            if (node.files === 0) {
                return '--';
            }

            return <ProgressComponent total={donorData.files.hits.total} value={node.files} />;
        },

        title: `(n=${donorData.files.hits.total})`,
        width: 85,
    },
];
