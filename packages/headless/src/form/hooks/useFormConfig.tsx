import { FieldConfig, InputType, PartialFieldConfig, PartialFormConfig } from '@tutim/types';
import { getExistsMap } from '../../utils';
import { useTutimOptions } from '../../context';

export const useFormConfig = (formIdOrConfig: PartialFormConfig | string): PartialFormConfig => {
  const { options } = useTutimOptions();
  if (typeof formIdOrConfig === 'string') return options.forms[formIdOrConfig] || { fields: [] };
  return formIdOrConfig;
};

export const getFieldConfigsDefaults = (partialConfigs: PartialFieldConfig[]): FieldConfig[] => {
  const mapConfigDefault = (partialConfig: PartialFieldConfig): FieldConfig => ({
    type: partialConfig.type || InputType.Text,
    label: partialConfig.label ?? partialConfig.key,
    ...partialConfig,
  });
  const topLevelFields = partialConfigs.map(mapConfigDefault);
  const fields = topLevelFields.map((config) => {
    if (!config.children) return config;
    const children = { ...config.children, fields: config.children.fields.map(mapConfigDefault) };
    return { ...config, children };
  });
  return fields;
};

export const mergeFieldConfigs = (
  prevConfig: PartialFieldConfig[],
  overrides: PartialFieldConfig[]
): PartialFieldConfig[] => {
  const overrideConfigMapByKey = overrides.reduce((prev, next) => {
    prev[next.key] = next;
    return prev;
  }, {} as Record<string, PartialFieldConfig>);
  const existingFieldsMap = getExistsMap(prevConfig.map((config) => config.key));
  const existingOverrided = prevConfig.map((config) => {
    if (overrideConfigMapByKey[config.key]) return { ...config, ...overrideConfigMapByKey[config.key] };
    return config;
  });
  const newConfigs = Object.values(overrides).filter((config) => !existingFieldsMap[config.key]);
  const mergedConfigs = [...existingOverrided, ...newConfigs];
  return mergedConfigs;
};

export const getFieldConfigs = (prevConfig: PartialFieldConfig[], overrides: PartialFieldConfig[]): FieldConfig[] => {
  const merged = mergeFieldConfigs(prevConfig, overrides);
  const fieldConfigs = getFieldConfigsDefaults(merged);
  return fieldConfigs;
};

export const getDefaults = (fieldConfigs: FieldConfig[]) => {
  return fieldConfigs.reduce((prev: Record<string, any>, { key, defaultValue, children, type }) => {
    if (type === InputType.Array) {
      prev[key] = [];
    } else if (type === InputType.Nested && children) {
      prev[key] = getDefaults(children.fields);
    } else {
      prev[key] = defaultValue;
    }
    return prev;
  }, {});
};
