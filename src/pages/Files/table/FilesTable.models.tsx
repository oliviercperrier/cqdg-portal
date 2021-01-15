import { MdLock, MdLockOpen, MdLockOutline } from 'react-icons/md';
import { t } from 'locales/utils';

import { EFileInputType, formatFileSize } from 'utils/formatFileSize';

export const FilesModel = [
    {
        render: ({ node }: any) =>
            node.data_access.toLowerCase() === 'controled' ? (
                <MdLockOutline className="files-table-locks files-table-lock" />
            ) : (
                <MdLockOpen className="files-table-locks files-table-lock-open" />
            ),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.data_access.localeCompare(b.node.data_access),
            multiple: 1,
        },
        title: <MdLock className="files-table-locks" />,
    },
    {
        dataIndex: ['node', 'study', 'hits', 'edges', '0', 'node', 'name'],
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.study.hits.edges[0].node.name.localeCompare(b.node.study.hits.edges[0].node.name),
            multiple: 2,
        },
        title: t('facet.study.name'),
    },
    {
        dataIndex: ['node', 'file_name_keyword'],
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.file_name_keyword.localeCompare(b.node.file_name_keyword),
            multiple: 3,
        },
        title: t('facet.file_name_keyword'),
    },
    {
        dataIndex: ['node', 'data_category'],
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.data_category.localeCompare(b.node.data_category),
            multiple: 4,
        },
        title: t('facet.data_category'),
    },
    {
        dataIndex: ['node', 'file_format'],
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.file_format.localeCompare(b.node.file_format),
            multiple: 5,
        },
        title: t('facet.file_format'),
    },
    {
        render: ({ node }: any) => (!!node.is_harmonized ? 'yes' : 'no'),
        title: t('facet.is_harmonized'),
    },
    {
        dataIndex: ['node', 'data_type'],
        title: t('facet.data_type'),
    },
    {
        dataIndex: ['node', 'experimental_strategy'],
        title: t('facet.experimental_strategy'),
    },
    {
        dataIndex: ['node', 'platform'],
        title: t('facet.platform'),
    },
    {
        className: 'numerical',
        dataIndex: ['node', 'donors', 'hits', 'total'],
        title: t('facet.donors'),
    },
    {
        className: 'numerical',
        render: ({ node }: any) => formatFileSize(node.file_size, {}, EFileInputType.MB),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.file_size - b.node.file_size,
            multiple: 6,
        },
        title: t('facet.file_size'),
    },
];
