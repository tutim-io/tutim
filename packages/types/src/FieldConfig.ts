import { FormConfig } from './FormConfig';
import { Field } from './Field';

/**
 * field configuration options.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/

export interface FieldConfig {
  key: string;
  type: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  tooltip?: string;
  helperText?: string;
  options?: Option[];
  defaultValue?: any;
  custom?: Record<string, any>;
  validations?: Record<string, Validation | undefined>;
  Field?: Field;
  children?: Pick<FormConfig, 'fields'>;
}

/**
 * input field types, can add any input that you want and register with `TutimProvider` or use with `Custom` `type` and `Field` prop.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/

export enum InputType {
  Text = 'text',
  Select = 'select',
  Radio = 'radio',
  Switch = 'switch',
  Checkbox = 'checkbox',
  Number = 'number',
  Date = 'date',
  Password = 'password',
  TextArea = 'text-area',
  Json = 'json',
  MultiText = 'multi-text',
  MultiSelect = 'multi-select',
  MultiCheckbox = 'multi-checkbox',
  Object = 'object',
  Array = 'array',
  Custom = 'custom',
}

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface Validation {
  value?: number | boolean | string;
  message?: string;
}
