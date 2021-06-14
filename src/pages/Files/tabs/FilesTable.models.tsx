import { MdLock, MdLockOpen, MdLockOutline } from 'react-icons/md';

import InternalLink from 'components/functionnal/InternalLink';
import { t } from 'locales/translate';
import { Routes } from 'routes';
import { INode } from 'types/interface/data';
import { addFilter } from 'utils/filters/manipulator';
import { EFileInputType, formatFileSize } from 'utils/formatFileSize';

export const FilesModel = [
    {
        hidden: false,
        id: 'data_access',
        initialOrder: 1,
        movable: false,
        render: ({ node }: INode): React.ReactElement =>
            node.data_access.toLowerCase() === 'controled' ? (
                <MdLockOutline className="table-locks table-lock" />
            ) : (
                <MdLockOpen className="table-locks table-lock-open" />
            ),
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.data_access.localeCompare(b.node.data_access),
            multiple: 1,
        },
        title: <MdLock className="table-locks" />,
        translate: 'Controlled',
    },
    {
        dataIndex: ['node', 'internal_file_id'],
        hidden: false,
        id: 'internal_file_id',
        initialOrder: 2,
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.internal_file_id.localeCompare(b.node.internal_file_id),
            multiple: 3,
        },
        title: t('facet.internal_file_id'),
        translate: 'facet.internal_file_id',
    },
    {
        className: 'numerical',
        hidden: false,
        id: 'donors.hits.edges[0].node.internal_donor_id',
        initialOrder: 3,
        movable: true,
        render: ({ node }: INode): React.ReactElement => {
            const linkProps =
                node.donors.hits.total > 1
                    ? {
                          filters: addFilter(null, 'internal_donor_id', [
                              node.donors.hits.edges[0].node.internal_donor_id,
                          ]),
                          path: Routes.FILES,
                          query: { searchTableTab: 'donors' },
                      }
                    : {
                          params: { id: node.donors.hits.edges[0].node.internal_donor_id },
                          path: Routes.DONOR,
                      };
            return <InternalLink {...linkProps}>{node.donors.hits.total}</InternalLink>;
        },
        title: t('facet.donors'),
        translate: 'facet.donors',
    },
    {
        hidden: false,
        id: 'study.hits.edges[0].node.name',
        initialOrder: 4,
        movable: true,
        render: ({ node }: INode): React.ReactElement => (
            <InternalLink params={{ id: node.study.hits.edges[0].node.internal_study_id }} path={Routes.STUDY}>
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
        dataIndex: ['node', 'data_category'],
        hidden: false,
        id: 'data_category',
        initialOrder: 5,
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
        initialOrder: 6,
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
        className: 'numerical',
        hidden: false,
        id: 'file_size',
        initialOrder: 6,
        movable: true,
        render: ({ node }: INode): string => formatFileSize(node.file_size, {}, EFileInputType.MB) as string,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.file_size - b.node.file_size,
            multiple: 6,
        },
        title: t('facet.file_size'),
        translate: 'facet.file_size',
    },
];
