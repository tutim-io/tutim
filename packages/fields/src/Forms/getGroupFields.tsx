import React from 'react';
import { Box } from '@mui/material';
import { FieldsByKey, FormLayout, LayoutGroupConfigs } from '@tutim/types';
import { FieldGroup } from './FieldGroup';
import { FieldCollapse } from '../Fields/SpecialFields/Collapse';

export const getGroupFields = (formLayout: FormLayout, fieldsByKey: FieldsByKey): React.ReactNode[] => {
  const getGroupFromGroupConfig = (groupConfigs: LayoutGroupConfigs) => {
    if (!groupConfigs.groups) return [];
    return groupConfigs.groups.reduce((aggFields: React.ReactNode[], group) => {
      const topLevelFields = group.fieldKeys.map((key: string) => fieldsByKey[key]).filter(Boolean);
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
            <Box
              key={group.key}
              sx={{ p: 1, border: '1px dashed rgba(0, 0, 0, 0.1)', display: 'block', paddingTop: '16px' }}
            >
              {fieldGroup}
            </Box>
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
