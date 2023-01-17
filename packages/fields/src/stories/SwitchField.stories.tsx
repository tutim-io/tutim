import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SwitchField } from '../Fields';
import { FieldProps } from '@tutim/types';

export default {
  title: 'Fields/SwitchField',
  component: SwitchField,
} as Meta;

const fieldConfig = {
  key: 'firstName',
  label: 'Field Display Name',
  isDisabled: false,
  type: 'text',
  isRequired: false,
};

const Template: Story<FieldProps> = (args) => <SwitchField {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  inputProps: { value: false, onChange: () => {} },
  fieldConfig,
};

export const Value = Template.bind({});
Value.args = {
  inputProps: { value: true, onChange: () => {} },
  fieldConfig,
};

export const Error = Template.bind({});
Error.args = {
  inputProps: { value: false, onChange: () => {} },
  fieldConfig,
  fieldState: { error: { message: 'This field is required' } },
};

export const Required = Template.bind({});
Required.args = {
  inputProps: { value: false, onChange: () => {} },
  fieldConfig: { ...fieldConfig, isRequired: true },
};

export const Disabled = Template.bind({});
Disabled.args = {
  inputProps: { value: false, onChange: () => {} },
  fieldConfig: { ...fieldConfig, isDisabled: true },
};
