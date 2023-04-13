import React from 'react';
import { FormConfig } from '@tutim/types';
import { TutimWizard, useTutimWizard } from '@tutim/fields';

const config: FormConfig = {
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      isRequired: true,
      tooltip: 'A tooltip',
      helperText: 'A helper text',
      placeholder: 'A placeholder',
    },
    {
      key: 'lastName',
      isRequired: true,
      label: 'Last Name',
      type: 'text',
    },
    { key: 'email', isRequired: true, label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'number' },
    { key: 'additional', label: 'additional', type: 'text', isRequired: true },
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
      {
        label: 'Additional',
        fields: ['additional'],
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
  const wizardContext = useTutimWizard({ initialValues, onSubmit: console.log, config });
  return (
    <TutimWizard onSubmit={console.log} config={config} initialValues={initialValues} wizardContext={wizardContext} />
  );
};
