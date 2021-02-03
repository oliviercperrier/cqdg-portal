import { t } from 'locales/utils';

interface IAggregation {
    buckets: any[];
}

export const getFilters = (aggregation: IAggregation) =>
    aggregation
        ? aggregation.buckets.map((f) => ({
              ...f,
              id: f.key.trim().toLowerCase().split(' ').join('.'),
              name: t(`aggregation.${f.key.trim().toLowerCase().split(' ').join('.')}`, {}, f.key),
          }))
        : [];
