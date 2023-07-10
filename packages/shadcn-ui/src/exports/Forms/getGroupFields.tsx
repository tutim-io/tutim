import React from 'react';
import { FieldsByKey, FormLayout, LayoutGroupConfigs } from '@tutim/types';
import { FieldGroup } from './FieldGroup';
import { FieldCollapse } from './Collapse';

export const getGroupFields = (formLayout: FormLayout, fieldsByKey: FieldsByKey): React.ReactNode[] => {
  const getGroupFromGroupConfig = (groupConfigs: LayoutGroupConfigs) => {
    if (!groupConfigs.groups) return [];
    return groupConfigs.groups.reduce((aggFields: React.ReactNode[], group) => {
      const topLevelFields = group.fields.map((key: string) => fieldsByKey[key]).filter(Boolean);
      const subGroupFields = group.subGroups ? getGroupFromGroupConfig(group.subGroups) : [];
      const fields = [...topLevelFields, ...subGroupFields];

      if (!fields.length) return aggFields;

      const fieldGroup = (
        <FieldGroup layout={group.layout} key={group.key}>
          {fields}
        </FieldGroup>
      );

      if (group.title) {
        aggFields.push(
          <FieldCollapse
            key={group.key}
            error={undefined}
            title={<span style={{ fontSize: '16px' }}>{group.title} </span>}
          >
            <div
              key={group.key}
              className='block p-1 pt-5 border-black border-dashed border-opacity-10'
            >
              {fieldGroup}
            </div>
          </FieldCollapse>
        );
      } else {
        aggFields.push(fieldGroup);
      }
      return aggFields;
    }, []);
  };
  const groups = getGroupFromGroupConfig(formLayout.groupConfigs || {});
  return groups;
};
