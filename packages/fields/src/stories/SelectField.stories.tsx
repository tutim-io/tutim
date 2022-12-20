import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SelectField } from '../Fields';
import { FieldProps } from '@tutim/types';

export default {
  title: 'Fields/SelectField',
  component: SelectField,
} as Meta;

const fieldConfig = {
  key: 'firstName',
  label: 'Field Display Name',
  isDisabled: false,
  inputType: 'select',
  isRequired: false,
  options: [
    { value: 'admin', label: 'Administrator' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'editor', label: 'Editor' },
  ],
};

const Template: Story<FieldProps> = (args) => <SelectField {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  inputProps: { value: '', onChange: () => {} },
  fieldConfig,
};

export const Value = Template.bind({});
Value.args = {
  inputProps: { value: 'admin', onChange: () => {} },
  fieldConfig,
};

export const Error = Template.bind({});
Error.args = {
  inputProps: { value: '', onChange: () => {} },
  fieldConfig,
  fieldState: { error: { message: 'This field is required' } },
};

export const Required = Template.bind({});
Required.args = {
  inputProps: { value: '', onChange: () => {} },
  fieldConfig: { ...fieldConfig, isRequired: true },
};

export const Disabled = Template.bind({});
Disabled.args = {
  inputProps: { value: '', onChange: () => {} },
  fieldConfig: { ...fieldConfig, isDisabled: true },
};
