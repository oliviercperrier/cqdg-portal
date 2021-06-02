import { useIntl } from 'react-intl';
import { IDictionary as FiltersDict } from '@ferlab/ui/core/components/filters/types';
import { IDictionary as QueryBuilderDict } from '@ferlab/ui/core/components/QueryBuilder/types';

import { t } from 'locales/translate';

export const getQueryBuilderDictionary = (): QueryBuilderDict => {
    const intl = useIntl();

    return {
        actions: {
            addQuery: t('global.querybuilder.actions.new'),
            clear: {
                buttonTitle: intl.formatMessage({ id: 'global.querybuilder.actions.clear.button' }),
                cancel: intl.formatMessage({ id: 'global.querybuilder.actions.clear.cancel' }),
                confirm: intl.formatMessage({ id: 'global.querybuilder.actions.clear.confirm' }),
                description: intl.formatMessage({ id: 'global.querybuilder.actions.clear.description' }),
                title: intl.formatMessage({ id: 'global.querybuilder.actions.clear.title' }),
            },
            delete: {
                cancel: t('global.querybuilder.actions.delete.cancel'),
                confirm: t('global.querybuilder.actions.delete.confirm'),
                title: t('global.querybuilder.actions.delete.title'),
            },
        },
        query: { facet: (key) => t(`facet.${key}`), noQuery: t('global.querybuilder.empty') },
    };
};

export const getFiltersDictionary = (): FiltersDict => ({
    actions: {
        all: t('global.filters.actions.all'),
        apply: t('global.filters.actions.apply'),
        clear: t('global.filters.actions.clear'),
        less: t('global.filters.actions.less'),
        more: t('global.filters.actions.more'),
        none: t('global.filters.actions.none'),
    },
    checkBox: {
        searchPlaceholder: t('global.filters.checkbox.placeholder'),
    },
    messages: {
        errorNoData: t('global.filters.messages.empty'),
    },
});
