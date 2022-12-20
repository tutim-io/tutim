import React from 'react';
import { useForm as RHFuseForm } from 'react-hook-form';
import { PartialFormConfig, UseFormReturn } from '@tutim/types';
import { getFieldsFromMap } from '../utils';
import { getUseFormInit } from './useFormInit';
import { useDisplayIfLogic } from './useRenderLogic';
import { getDefaults, getFieldConfigs } from './useFormConfig';
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
 *     { key: 'firstName', label: 'First Name', inputType: 'text', defaultValue: 'first' },
 *     { key: 'lastName', label: 'Last Name', inputType: 'text' },
 *     { key: 'clicker', label: 'Click Me', inputType: 'custom', defaultValue: 0, Field: CustomField },
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
export const useForm = (
  baseConfig: PartialFormConfig,
  stateConfig: PartialFormConfig = { fields: [] }
): UseFormReturn => {
  try {
    const fieldConfigs = getFieldConfigs(baseConfig.fields, stateConfig.fields);
    const formConfig = { ...baseConfig, fields: fieldConfigs };
    const defaultValues = getDefaults(fieldConfigs);

    const { control, setValue, watch, getValues, ...form } = RHFuseForm({ defaultValues });
    useDisplayIfLogic(watch, fieldConfigs);

    const useFormInit = React.useMemo(() => getUseFormInit(setValue), [setValue]);
    const fieldsByKey = useFormFields(control, { fields: fieldConfigs, layout: formConfig.layout }, getValues());
    const fields = getFieldsFromMap(fieldsByKey);
    const layout = useFormLayout(formConfig);
    const logic = formConfig.logic || {};

    return {
      ...form,
      control,
      setValue,
      watch,
      getValues,
      fields,
      fieldsByKey,
      layout,
      logic,
      schema: formConfig,
      useFormInit,
    };
  } catch (error) {
    console.error(error);
    return { error } as UseFormReturn; // Naive error handling, TODO: create validations and better error handling
  }
};
