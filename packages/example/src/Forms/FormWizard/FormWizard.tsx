import React from 'react';
import { TutimWizard } from '@tutim/fields';
import config from './basic.json';
import { FieldsPerRow } from '@tutim/types';

const layout = {
  wizard: {},
  groupConfigs: {
    groups: [
      {
        key: 'name',
        title: 'Name',
        fieldKeys: ['firstName', 'lastName'],
        layout: { fieldsPerRow: FieldsPerRow.Two },
      },
      { key: 'role', title: 'Role', fieldKeys: ['role'], layout: { fieldsPerRow: FieldsPerRow.One } },
      {
        key: 'settings',
        title: 'Settings',
        fieldKeys: ['hosting', 'agree', 'enable'],
        layout: { fieldsPerRow: FieldsPerRow.Three },
      },
    ],
  },
} as any;

export const FormWizard = (): JSX.Element => {
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return <TutimWizard onSubmit={onSubmit} config={{ ...config, layout }} />;
};
