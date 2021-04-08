import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Select, Tag } from 'antd';

import ListItem from 'components/functionnal/SaveSets/ListItem';
const { OptGroup, Option } = Select;

interface ISelectSets {
    onSelect: (items: ISelectDataContainer[]) => void;
    dictionary?: {
        title: React.ReactNode;
        placeholder: React.ReactNode;
    };
    data: IDataSaveSet[];
}

interface IDataSaveSet {
    selectedValues?: string[];
    values: IItemListSaveSets[];
    indexName: string;
    dictionary?: {
        groupTitle: React.ReactNode;
        emptyValue: React.ReactNode;
    };
}

interface ISelectDataContainer {
    key: string;
    data: string[];
}

interface IItemListSaveSets {
    count: number;
    name: string;
    icon?: React.ReactNode;
}
const SelectSets: React.FunctionComponent<ISelectSets> = ({ data, dictionary, onSelect }) => {
    const [aggData, setAggData] = useState<any>();
    useEffect(() => {
        const aggregatedValues: any = {};
        for (let i = 0; i < data.length; i++) {
            aggregatedValues[data[i].indexName] = data[i].values.map((dataValue) => dataValue.name);
        }
        setAggData(aggregatedValues);
    }, [data]);

    const handleChange = (values: string[]) => {
        const selectedData: any = {};
        values.forEach((value) => {
            Object.keys(aggData).forEach((key) => {
                if (aggData[key].includes(value)) {
                    if (!selectedData[key]) {
                        selectedData[key] = [];
                    }
                    selectedData[key].push(value);
                }
            });
        });
        onSelect(Object.keys(selectedData).map((key) => ({ data: selectedData[key], key })));
    };

    const currentValues = data.reduce((acc, item) => [...acc, ...(item.selectedValues || [])], [] as string[]);
    return (
        <StackLayout vertical>
            <label>{dictionary?.title || 'Select'}</label>
            <Select
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value: string[]) => handleChange(value)}
                placeholder={dictionary?.placeholder || 'placeholder'}
                suffixIcon={<AiOutlineDown />}
                tagRender={({ onClose, value }) => (
                    <Tag closable onClose={onClose}>
                        {value}
                    </Tag>
                )}
                value={currentValues}
            >
                {data.map((dataSaveSet) => (
                    <OptGroup label={dataSaveSet.dictionary?.groupTitle || 'Group Title'}>
                        {dataSaveSet.values.length > 0 ? (
                            dataSaveSet.values.map((item: any) => (
                                <Option value={item.name}>
                                    <ListItem Icon={item.icon} label={item.name} total={item.count} />
                                </Option>
                            ))
                        ) : (
                            <Option disabled value="nothing">
                                {dataSaveSet.dictionary?.emptyValue || 'No Data'}
                            </Option>
                        )}
                    </OptGroup>
                ))}
            </Select>
        </StackLayout>
    );
};

export default SelectSets;
