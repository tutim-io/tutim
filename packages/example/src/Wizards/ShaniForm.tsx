import React from 'react';
import { FormConfig, Field } from '@tutim/types';
import { TutimWizard } from '@tutim/headless';
import { SimpleButton } from '@tutim/shadcn-ui';

const config: FormConfig = {
  fields: [
    {
      key: 'MultiCheckboxField',
      label: 'Multi-Checkbox',
      type: 'multi-checkbox',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2', disabled: true },
      ],
      custom: { orientation: 'vertical' },
    },
    {
      key: 'MultiSelectField',
      label: 'TextField',
      type: 'multi-select',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2', disabled: true },
        { value: '3', label: '3' },
        { value: '11', label: '11' },
        { value: '112', label: '112' },
        { value: '22', label: '22' },
        { value: '2222', label: '2222' },
      ],
    },
    {
      key: 'MultiTextField',
      label: 'TextField',
      type: 'multi-text',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2', disabled: true },
      ],
    },
    {
      key: 'NumberField',
      label: 'TextField',
      type: 'number',
    },
    {
      key: 'PasswordField',
      label: 'TextField',
      type: 'password',
    },
  ],
  wizard: {
    steps: [
      {
        label: 'Basic',
        fields: ['MultiCheckboxField', 'MultiSelectField', 'MultiTextField', 'NumberField', 'PasswordField'],
      },
    ],
    orientation: 'vertical',
  },
  meta: {
    title: 'Example Title',
  },
};

const CustomField: Field = ({ inputProps }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return <SimpleButton label={`Click Me: ${value}`} onClick={onClick} />;
};

const customField = {
  key: 'clicker',
  label: 'Click Me',
  type: 'custom',
  defaultValue: 0,
  Field: CustomField,
};

const newConfig = { ...config, fields: [...config.fields, customField] };

const initialValues = {
  firstName: 'sami',
  agree: true,
  enable: true,
  hosting: 'cloud',
};

export const ShaniForm = (): JSX.Element => {
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return <TutimWizard onSubmit={onSubmit} config={newConfig} initialValues={initialValues} />;
};
