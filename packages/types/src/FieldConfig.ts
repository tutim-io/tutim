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
  options?: Option[];
  defaultValue?: any;
  validations?: Record<string, Validation | undefined>;
  logic?: FieldLogic;
  Field?: Field;
  children?: Pick<FormConfig, 'fields'>;
}

/**
 * input field types, can add any input that you want and register with `FormProvider` or use with `Custom` `type` and `Field` prop.
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

interface BasicLogic {
  field: string;
  operator: string;
  value: any;
}
export interface FieldLogic {
  displayIf?: BasicLogic;
}

export enum Operators {
  EQUAL = 'equal',
  IN = 'in',
}
