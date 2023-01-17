import React from 'react';
import { useForm as RHFuseForm } from 'react-hook-form';
import { OnSubmit, PartialFormConfig, UseFormOptions, UseFormReturn } from '@tutim/types';
import { getFieldsFromMap } from '../utils';
import { getUseFormInit } from './useFormInit';
import { useDisplayIfLogic } from './useRenderLogic';
import { getDefaults, getFieldConfigs, useFormConfig } from './useFormConfig';
import { useFormFields } from './useFormFields';
import { useFormLayout } from './useFormLayout';

/**
 * a hook to manage form infrastructure.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - form configuration
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 *  const config = {
 *   fields: [
 *     { key: 'firstName', label: 'First Name', type: 'text', defaultValue: 'first' },
 *     { key: 'lastName', label: 'Last Name', type: 'text' },
 *     { key: 'clicker', label: 'Click Me', type: 'custom', defaultValue: 0, Field: CustomField },
 *   ],
 * };
 *
 * export const HeadlessForm = (): JSX.Element => {
 *   const { fieldsByKey, watch, handleSubmit } = useForm(config);
 *   const name = watch('firstName');
 *
 *   return (
 *     <form onSubmit={handleSubmit(console.log)}>
 *       {fieldsByKey['firstName']}
 *       {name === 'first' && fieldsByKey['lastName']}
 *       {fieldsByKey['clicker']}
 *       <input type="submit" />
 *     </form>
 *   );
 * };
 * ```
 */
export const useForm = (baseConfig: PartialFormConfig | string, options?: UseFormOptions): UseFormReturn => {
  try {
    const config = useFormConfig(baseConfig);
    const fieldConfigs = getFieldConfigs(config.fields, []);
    const formConfig = { ...config, fields: fieldConfigs };
    const defaultValues = getDefaults(fieldConfigs);

    const { control, setValue, watch, getValues, handleSubmit, ...form } = RHFuseForm({ ...options, defaultValues });
    useDisplayIfLogic(watch, fieldConfigs);

    const useFormInit = React.useMemo(() => getUseFormInit(setValue), [setValue]);
    const nativeSubmit = (onSubmit: OnSubmit) => handleSubmit((data) => onSubmit({ data, schema: formConfig }));

    const fieldsByKey = useFormFields(control, { fields: fieldConfigs, layout: formConfig.layout }, getValues());
    const fields = getFieldsFromMap(fieldsByKey);
    const layout = useFormLayout(formConfig);
    const logic = formConfig.logic || {};
    const meta = formConfig.meta || {};

    return {
      ...form,
      control,
      setValue,
      watch,
      getValues,
      handleSubmit,
      fields,
      fieldsByKey,
      layout,
      logic,
      meta,
      schema: formConfig,
      useFormInit,
      nativeSubmit,
    };
  } catch (error) {
    console.error(error);
    return { error } as UseFormReturn; // Naive error handling, TODO: create validations and better error handling
  }
};
