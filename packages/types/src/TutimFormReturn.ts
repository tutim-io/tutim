import { UseFormReturn as RHFUseFormReturn, UseFormProps as RHFUseFormProps } from 'react-hook-form';
import { FieldsByKey } from './Field';
import { OnSubmit } from './form';
import { FormConfig, FormLogic, FormMeta } from './FormConfig';
import { FormLayout } from './FormLayout';

export interface TutimFormReturn {
  schema: FormConfig;
  fields: React.ReactNode[];
  fieldsByKey: FieldsByKey;
  layout: FormLayout;
  logic: FormLogic;
  meta: FormMeta;
  useFormInit: UseFormInit;
  nativeSubmit: (onSubmit: OnSubmit) => (e?: React.BaseSyntheticEvent) => void;
  error?: unknown;
}

export type UseFormInit = (getData: () => Promise<Record<string, any> | undefined>) => boolean;

export type UseFormReturn = RHFUseFormReturn<any> & TutimFormReturn;
export type UseFormOptions = RHFUseFormProps<any>;
