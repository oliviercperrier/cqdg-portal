import React from 'react';
import { MdInsertDriveFile, MdPeople } from 'react-icons/md';
import { Select, Tag } from 'antd';

import ListItem from 'components/functionnal/SaveSets/ListItem';
import { t } from 'locales/translate';
import { GET_ALL_SAVE_SETS } from 'store/queries/files/saveSets';
import { Hits, useLazyResultQuery } from 'utils/graphql/query';
const { OptGroup, Option } = Select;
const SelectSets = () => {
    const { result } = useLazyResultQuery<any>(GET_ALL_SAVE_SETS);
    let fileSaveSets = [];
    let donorSaveSets = [];
    if (result) {
        donorSaveSets = result.saveSetsDonor.map((item: any) => ({
            count: item.content.ids.length,
            name: item.content.name,
        }));
        fileSaveSets = result.saveSetsFile.map((item: any) => ({
            count: item.content.ids.length,
            name: item.content.name,
        }));
    }
    return (
        <Select
            maxTagCount="responsive"
            mode="multiple"
            placeholder={t('global.savesets.choose')}
            tagRender={({ onClose, value }) => (
                <Tag closable onClose={onClose}>
                    {value}
                </Tag>
            )}
        >
            <OptGroup label={t('global.donors.title')}>
                {donorSaveSets.length > 0 ? (
                    donorSaveSets.map((item: any) => (
                        <Option value={item.name}>
                            <ListItem Icon={<MdPeople />} label={item.name} total={item.count} />
                        </Option>
                    ))
                ) : (
                    <Option disabled value="nothing">
                        {t('global.empty')}
                    </Option>
                )}
            </OptGroup>
            <OptGroup label={t('global.files.title')}>
                {fileSaveSets.map((item: any) => (
                    <Option value={item.name}>
                        <ListItem Icon={<MdInsertDriveFile />} label={item.name} total={item.count} />
                    </Option>
                ))}
            </OptGroup>
        </Select>
    );
};

export default SelectSets;
