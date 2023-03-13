import { FormConfig, PartialFormConfig } from './FormConfig';

export type OnSubmit = (values: { data: any; schema: FormConfig | PartialFormConfig }) => void;
