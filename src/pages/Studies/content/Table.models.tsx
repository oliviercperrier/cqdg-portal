import InternalLink from 'components/functionnal/InternalLink';
import { t } from 'locales/translate';
import { Routes } from 'routes';
import { ITableColumnItem } from 'types/interface';
import { addFilter } from 'utils/filters/manipulator';

const StudyModel = [
    {
        hidden: false,
        id: 'internal_study_id',
        movable: true,
        render: ({ node }: any) => (
            <InternalLink params={{ id: node.internal_study_id }} path={Routes.STUDY}>
                {node.name}
            </InternalLink>
        ),
        title: t('facet.study.study_id_keyword'),
        translate: 'facet.study.study_id_keyword',
    },
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
        translate: 'facet.study.name',
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
        translate: 'facet.domain',
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
        translate: 'facet.population',
    },
    {
        hidden: false,
        id: 'donors',
        movable: true,
        render: ({ node }: any) => (
            <InternalLink
                filters={addFilter(null, 'name', [node.name])}
                path={Routes.FILES}
                query={{ searchTableTab: 'donors' }}
            >
                {node.donors.hits.total}
            </InternalLink>
        ),
        title: t('global.donors.title'),
        translate: 'global.donors.title',
    },
    {
        hidden: false,
        id: 'files',
        movable: true,
        render: ({ node }: any) => (
            <InternalLink
                filters={addFilter(null, 'name', [node.name])}
                path={Routes.FILES}
                query={{ searchTableTab: 'files' }}
            >
                {node.files.hits.total}
            </InternalLink>
        ),
        title: t('global.files.title'),
        translate: 'global.files.title',
    },
];

export const presetModel: ITableColumnItem[] = StudyModel.map((item, index) => ({ ...item, initialOrder: index }));
