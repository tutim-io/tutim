import { FormConfig, PartialFormConfig } from './FormConfig';

export interface WizardProps {
  onSubmit: OnSubmit;
  formId?: string;
  config?: PartialFormConfig;
  initialValues?: Record<string, any>;
  wizardContext?: any;
}

export type OnSubmit = (values: { data: any; schema: FormConfig | PartialFormConfig }) => void;
