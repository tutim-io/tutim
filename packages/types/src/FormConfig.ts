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
  logic?: FormLogic;
  meta?: FormMeta;
  id?: string;
}

export interface FormMeta {
  title?: string;
  description?: string;
  version?: string;
  steps?: Steps;
}

export interface Steps {
  [stepname: string]: {
    label: string;
    elements: string[];
  };
}

export interface FormLogic {
  submissionPage?: { allowResubmit?: boolean };
}
