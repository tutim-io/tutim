import * as RHF from 'react-hook-form';
import { FieldConfig, Operators } from '@tutim/types';

export const useDisplayIfLogic = (watch: RHF.UseFormWatch<Record<string, any>>, fieldConfigs: FieldConfig[]) => {
  const watchField = (config: FieldConfig) => {
    const { displayIf } = config.logic || {};
    if (!displayIf) return;
    watch(displayIf.field);
  };
  fieldConfigs.forEach(watchField);
  fieldConfigs.forEach((config) => {
    if (!config.children) return config;
    config.children.fields.forEach(watchField);
  });
};

export const computeRenderedConfigs = (values: Record<string, any>) => {
  return (fieldConfigs: FieldConfig[]): FieldConfig[] => {
    const displayFilter = predicateDisplayIf(values);
    const topLevelFields = fieldConfigs.filter(displayFilter);
    const fields = topLevelFields.map((config) => {
      if (!config.children) return config;
      const children = { ...config.children, fields: config.children.fields.filter(displayFilter) };
      return { ...config, children };
    });
    return fields;
  };
};

export const predicateDisplayIf = (values: Record<string, any>) => {
  return (config: FieldConfig): boolean => {
    const { displayIf } = config.logic || {};
    if (!displayIf) return true;
    const { field, operator, value } = displayIf;
    const [key1, key2, key3] = field.split('.');
    if (key1 === '$') return true;
    const currentValue = key3 ? values[key1]?.[key2]?.[key3] : key2 ? values[key1]?.[key2] : values[key1];
    if (operator === Operators.EQUAL) return value === currentValue;
    if (operator === Operators.IN && Array.isArray(value)) return value.includes(currentValue);
    return false;
  };
};
