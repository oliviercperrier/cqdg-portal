import React, { useEffect, useState } from 'react';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button, Divider, InputNumber, Select } from 'antd';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

import { IFilter, IFilterProps, IFilterRange } from '../Filters';

import './RangeFilter.scss';

const { Option } = Select;

interface IRangeFilterProps extends IFilterProps {
    handleFromChanged?: () => void;
    handleToChanged?: () => void;
    handleUnitChanged?: () => void;
    filters: IFilter<IFilterRange>[];
}

const RangeFilter: React.FC<IRangeFilterProps> = ({ dictionary, filterGroup, filters, onChange, selectedFilters }) => {
    const defaultStateValue = {
        max: get(selectedFilters, '[0].data.max', undefined),
        min: get(selectedFilters, '[0].data.min', undefined),
        rangeType: get(selectedFilters, '[0].data.rangeType', filterGroup.config!.rangeTypes[0].key),
    };

    const currentFilter: IFilter<IFilterRange> = filters[0];
    const maxPossibleValue = get(filterGroup, 'config.max', 0);
    const minPossibleValue = get(filterGroup, 'config.min', 0);

    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);

    useEffect(() => {
        setRangeFilter(defaultStateValue);
    }, [selectedFilters]);

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onMinChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        const min = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(min < minPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, min }));
        }
    };

    const onMaxChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        const max = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(max < maxPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, max }));
        }
    };

    const { max, min, rangeType } = rangeFilter;
    const { config: range } = filterGroup;

    if (!range) {
        return null;
    }
    const dotField = filterGroup.field;
    const buttonActionDisabled = !isNumber(min) && !isNumber(max);
    return (
        <StackLayout className="fui-rf-container" vertical>
            <StackLayout className="fui-rf-grouped" horizontal>
                {range.rangeTypes.length > 0 && (
                    <div className="fui-rf-range-target">
                        <Select className="fui-rf-range-target-select" onChange={onRangeTypeChanged} value={rangeType}>
                            {range.rangeTypes.map((u) => (
                                <Option key={u.key} value={u.key}>
                                    {u.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                <StackLayout className="fui-rf-grouped-inputs">
                    <InputNumber
                        className="range-input"
                        id={`from-${dotField}`}
                        key={`from-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMinChanged}
                        placeholder={get(dictionary, 'range.min', 'min')}
                        title={get(dictionary, 'range.min', 'min')}
                        type="number"
                        value={min}
                    />
                    <Divider className="fui-rf-grouped-inputs-spacer" type="vertical" />
                    <InputNumber
                        className="range-input"
                        id={`to-${dotField}`}
                        key={`to-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMaxChanged}
                        placeholder={get(dictionary, 'range.max', 'max')}
                        title={get(dictionary, 'range.max', 'max')}
                        type="number"
                        value={max}
                    />
                </StackLayout>
            </StackLayout>

            <StackLayout className="fui-rf-actions" horizontal>
                <Button disabled={buttonActionDisabled} onClick={() => onChange(filterGroup, [])} type="text">
                    {get(dictionary, 'actions.none', 'clear')}
                </Button>
                <Button
                    className="fui-rf-actions-apply"
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: rangeFilter }]);
                    }}
                >
                    {get(dictionary, 'actions.apply', 'apply')}
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default RangeFilter;
