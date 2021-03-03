import InternalLink from 'components/functionnal/InternalLink';
import { t } from 'locales/translate';
import { Routes } from 'routes';

const StudyModel = [
    {
        dataIndex: ['node', 'name'],
        hidden: false,
        id: 'study_name',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number => a.node.name.localeCompare(b.node.name),
            multiple: 1,
        },
        title: t('facet.study.name'),
    },
    {
        dataIndex: ['node', 'domain'],
        hidden: false,
        id: 'domain',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.domain.localeCompare(b.node.domain),
            multiple: 2,
        },
        title: t('facet.domain'),
    },
    {
        dataIndex: ['node', 'population'],
        hidden: false,
        id: 'population',
        movable: true,
        sortDirection: ['ascend', 'descend'],
        sorter: {
            compare: (a: Record<string, any>, b: Record<string, any>): number =>
                a.node.population.localeCompare(b.node.population),
            multiple: 3,
        },
        title: t('facet.population'),
    },
    {
        dataIndex: ['node', 'donors', 'hits', 'total'],
        hidden: false,
        id: 'donors',
        movable: true,
        title: t('global.donors.title'),
    },
    {
        hidden: false,
        id: 'files',
        movable: true,
        render: ({ node }: any) => (
            <InternalLink
                filters={{
                    content: {
                        field: 'short_name_keyword',
                        value: [node.short_name_keyword],
                    },
                }}
                path={Routes.FILES}
                query={{ searchTableTab: 'files' }}
            >
                {node.files.hits.total}
            </InternalLink>
        ),
        title: t('global.files.title'),
    },
];

export const presetModel = StudyModel.map((item, index) => ({ ...item, initialOrder: index }));
