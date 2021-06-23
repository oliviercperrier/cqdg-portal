import { ColumnsType } from 'antd/lib/table';

import ProgressComponent from 'components/functionnal/Progress';
import { t } from 'locales/translate';
import { INode, INodeData } from 'types/interface/data';

export const dataCategoriesModel = (donorData: INodeData): ColumnsType => [
    { dataIndex: ['node', 'key'], title: t('global.category') },
    { className: 'numerical', dataIndex: ['node', 'files'], title: t('global.files.title') },
    {
        render: ({ node }: INode) => {
            if (node.files === 0) {
                return '--';
            }
            return <ProgressComponent total={donorData.files.hits.total} value={node.files} />;
        },

        title: `(n=${donorData.files.hits.total})`,
        width: 85,
    },
];

export const experimentalStrategiesModel = (donorData: INodeData): ColumnsType => [
    { dataIndex: ['node', 'key'], title: t('global.strategy') },
    { className: 'numerical', dataIndex: ['node', 'files'], title: t('global.files.title') },
    {
        render: ({ node }: INode) => {
            if (node.files === 0) {
                return '--';
            }

            return <ProgressComponent total={donorData.files.hits.total} value={node.files} />;
        },

        title: `(n=${donorData.files.hits.total})`,
        width: 85,
    },
];
