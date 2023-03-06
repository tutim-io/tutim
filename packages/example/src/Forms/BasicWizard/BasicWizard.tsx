import React from 'react';
import { FormConfig } from '@tutim/types';
import { Wizard } from '@tutim/fields';

const config: FormConfig = {
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      defaultValue: 'John',
    },
    {
      key: 'lastName',
      isRequired: true,
      label: 'Last Name',
      type: 'text',
    },
    { key: 'email', isRequired: true, label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'number' },
  ],
  meta: {
    title: 'Basic Wizard',
    steps: {
      page0: {
        label: 'Basic',
        elements: ['firstName', 'lastName'],
      },
      page1: {
        label: 'Contact',
        elements: ['email', 'phone'],
      },
    },
  },
};

export const BasicWizard = (): JSX.Element => {
  return <Wizard onSubmit={console.log} config={config} />;
};
