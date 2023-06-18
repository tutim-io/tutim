import { FieldConfig } from './FieldConfig';
import { FormLayout } from './FormLayout';

/**
 * form configuration
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/

export interface FormConfig {
  meta?: FormMeta;
  fields: FieldConfig[];
  layout?: FormLayout;
  logic?: FormLogic;
  wizard?: Wizard;
  id?: string;
}

export type PartialFieldConfig = Partial<FieldConfig> & Pick<FieldConfig, 'key'>;

/**
 * form configuration
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/
export interface PartialFormConfig {
  meta?: FormMeta;
  fields: PartialFieldConfig[];
  layout?: FormLayout;
  logic?: FormLogic;
  wizard?: Wizard;
  id?: string;
}

export interface FormMeta {
  title?: string;
  description?: string;
  version?: string;
}

export interface Wizard {
  steps: WizardStep[];
  orientation?: 'horizontal' | 'vertical';
}

export interface WizardStep {
  label: string;
  fields: string[];
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

export type FieldsLogic = Record<string, FieldLogic>;

export interface FormLogic {
  webhook?: {
    endpoint?: string;
  };
  submissionPage?: { allowResubmit?: boolean };
  fieldsLogic?: FieldsLogic;
  arrayFieldsLogic?: { [arrayKey: string]: FieldsLogic };
}
