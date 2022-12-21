import * as RHF from 'react-hook-form';
import { FieldConfig, FieldsByKey, FormConfig, InputType } from '@tutim/types';
import { useFieldComponents } from '../../context';
import { getField } from '../Field';
import { getChildConfigs, getFieldRelativeKeys } from '../utils';
import { FieldArray } from './useMultiField';
import { computeRenderedConfigs } from './useRenderLogic';

const configToFlatConfigs = (configs: FieldConfig[]): FieldConfig[] => {
  const aggConfigs = configs.reduce<FieldConfig[]>((prev, config) => {
    if (config.inputType === InputType.Nested) {
      const childConfigs = getChildConfigs(config);
      const flatConfigs = configToFlatConfigs(childConfigs);
      prev.push(...flatConfigs);
    } else {
      prev.push(config);
    }
    return prev;
  }, []);
  return aggConfigs;
};

export const useFormFields = (
  control: RHF.Control,
  { fields, layout }: FormConfig,
  formValue: Record<string, any>
): FieldsByKey => {
  const fieldComponents = useFieldComponents();
  if (!Object.keys(fieldComponents || {}).length) {
    throw new Error('fieldComponents is required, use `<FormProvider fieldComponents={...}`');
  }

  const Field = getField(control, fieldComponents);

  const configsToMap = (configs: FieldConfig[]) => {
    const flatConfigs = configToFlatConfigs(configs);
    return flatConfigs.reduce((prev: Record<string, any>, config) => {
      prev[config.key] = configToField(config);
      return prev;
    }, {});
  };

  const configToField = (config: FieldConfig) => {
    if (config.inputType === InputType.Array) {
      const UiFieldArray = fieldComponents[InputType.Array];
      const key = getFieldRelativeKeys(config.key).join('.');
      const layoutConfig = layout?.arrayConfigs?.[key];
      const field = FieldArray({ parentConfig: config, configsToMap, control, layoutConfig, UiFieldArray });
      return field;
    }

    return Field(config);
  };

  const fieldConfigs = computeRenderedConfigs(formValue)(fields);
  const fieldsByKey = configsToMap(fieldConfigs);
  return fieldsByKey;
};
