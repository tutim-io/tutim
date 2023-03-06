import { FormConfig } from './FormConfig';

export type OnSubmit = (values: { data: any; schema: FormConfig }) => void;
