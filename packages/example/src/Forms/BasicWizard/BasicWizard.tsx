import React from 'react';
import { FormConfig } from '@tutim/types';
import { Form } from '@tutim/fields';

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
  wizard: {
    steps: [
      {
        label: 'Basic',
        fields: ['firstName', 'lastName'],
      },
      {
        label: 'Contact',
        fields: ['email', 'phone'],
      },
    ],
    orientation: 'vertical',
  },
  meta: {
    title: 'Basic Wizard',
  },
};

export const BasicWizard = (): JSX.Element => {
  const initialValues = { lastName: 'Doe' };
  return <Form onSubmit={console.log} config={config} initialValues={initialValues} />;
};
