import { MdLock, MdLockOpen, MdLockOutline } from 'react-icons/md';

import InternalLink from 'components/functionnal/InternalLink';
import { t } from 'locales/translate';
import { Routes } from 'routes';
import { addFilter } from 'utils/filters/manipulator';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';

export const FilesModel = [
    {
        hidden: false,
        id: 'data_access',
        initialOrder: 0,
        movable: false,
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
        translate: 'Controlled',
    },
    {
        hidden: false,
        id: 'study.hits.edges[0].node.short_name_keyword',
        initialOrder: 1,
        movable: true,
        render: ({ node }: any) => (
            <InternalLink params={{ id: node.study.hits.edges[0].node.study_id_keyword }} path={Routes.STUDY}>
                {node.study.hits.edges[0].node.name}
            </InternalLink>
        ),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.study.hits.edges[0].node.name.localeCompare(b.node.study.hits.edges[0].node.name),
            multiple: 2,
        },
        title: t('facet.study.name'),
        translate: 'facet.study.name',
    },
    {
        dataIndex: ['node', 'file_name_keyword'],
        hidden: true,
        id: 'file_name_keyword',
        initialOrder: 2,
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.file_name_keyword.localeCompare(b.node.file_name_keyword),
            multiple: 3,
        },
        title: t('facet.file_name_keyword'),
        translate: 'facet.file_name_keyword',
    },
    {
        dataIndex: ['node', 'data_category'],
        hidden: false,
        id: 'data_category',
        initialOrder: 3,
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.data_category.localeCompare(b.node.data_category),
            multiple: 4,
        },
        title: t('facet.data_category'),
        translate: 'facet.data_category',
    },
    {
        dataIndex: ['node', 'file_format'],
        hidden: false,
        id: 'file_format',
        initialOrder: 4,
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.file_format.localeCompare(b.node.file_format),
            multiple: 5,
        },
        title: t('facet.file_format'),
        translate: 'facet.file_format',
    },
    {
        hidden: true,
        id: 'is_harmonized',
        initialOrder: 5,
        movable: true,
        render: ({ node }: any) => (!!node.is_harmonized ? 'yes' : 'no'),
        title: t('facet.is_harmonized'),
        translate: 'facet.is_harmonized',
    },
    {
        dataIndex: ['node', 'data_type'],
        hidden: true,
        id: 'data_type',
        initialOrder: 6,
        movable: true,
        title: t('facet.data_type'),
        translate: 'facet.data_type',
    },
    {
        dataIndex: ['node', 'experimental_strategy'],
        hidden: true,
        id: 'experimental_strategy',
        initialOrder: 7,
        movable: true,
        title: t('facet.experimental_strategy'),
        translate: 'facet.experimental_strategy',
    },
    {
        dataIndex: ['node', 'platform'],
        hidden: true,
        id: 'platform',
        initialOrder: 8,
        movable: true,
        title: t('facet.platform'),
        translate: 'facet.platform',
    },
    {
        className: 'numerical',
        hidden: false,
        id: 'donors.hits.edges[0].node.submitter_donor_id',
        initialOrder: 9,
        movable: true,
        render: ({ node }: any) => (
            <InternalLink
                filters={addFilter(null, 'submitter_donor_id', [node.donors.hits.edges[0].node.submitter_donor_id])}
                path={Routes.FILES}
                query={{ searchTableTab: 'donors' }}
            >
                {node.donors.hits.total}
            </InternalLink>
        ),
        title: t('facet.donors'),
        translate: 'facet.donors',
    },
    {
        className: 'numerical',
        hidden: false,
        id: 'file_size',
        initialOrder: 10,
        movable: true,
        render: ({ node }: any) => formatFileSize(node.file_size, {}, EFileInputType.MB),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.file_size - b.node.file_size,
            multiple: 6,
        },
        title: t('facet.file_size'),
        translate: 'facet.file_size',
    },
];
