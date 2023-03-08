import { FieldConfig } from './FieldConfig';
import { FormLayout } from './FormLayout';

/**
 * form configuration
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/

export interface FormConfig {
  fields: FieldConfig[];
  layout?: FormLayout;
  wizard?: Wizard;
  logic?: FormLogic;
  meta?: FormMeta;
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
  fields: PartialFieldConfig[];
  layout?: FormLayout;
  wizard?: Wizard;
  logic?: FormLogic;
  meta?: FormMeta;
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

export interface FormLogic {
  submissionPage?: { allowResubmit?: boolean };
}
