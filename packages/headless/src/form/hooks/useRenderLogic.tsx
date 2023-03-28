import * as RHF from 'react-hook-form';
import { FormConfig, FieldConfig, Operators } from '@tutim/types';

export const useDisplayIfLogic = (watch: RHF.UseFormWatch<Record<string, any>>, formConfig: FormConfig) => {
  const { fieldsLogic = {} } = formConfig.logic || {};

  const watchField = (key: string) => {
    const displayIf = fieldsLogic[key]?.displayIf;
    if (!displayIf) return;
    watch(displayIf.field);
  };

  Object.keys(fieldsLogic).forEach((fieldKey) => watchField(fieldKey));
};

export const computeRenderedConfigs = (values: Record<string, any>) => {
  return (formConfig: FormConfig): FieldConfig[] => {
    const displayFilter = predicateDisplayIf(values);

    const filterConfigChilds = (config: FieldConfig, parentKey?: string): FieldConfig | null => {
      const key = parentKey ? `${parentKey}.${config.key}` : config.key;
      const displayIf = formConfig.logic?.fieldsLogic?.[key]?.displayIf;

      if (!displayFilter(displayIf)) {
        return null;
      }

      if (!config.children) {
        return config;
      }

      const children = {
        ...config.children,
        fields: config.children.fields
          .map((childConfig) => filterConfigChilds(childConfig, key))
          .filter(Boolean) as FieldConfig[],
      };

      return { ...config, children };
    };

    const fields = formConfig.fields
      .map((topLevelConfig) => filterConfigChilds(topLevelConfig))
      .filter(Boolean) as FieldConfig[];

    return fields;
  };
};

export const predicateDisplayIf = (values: Record<string, any>) => {
  return (displayIf: any): boolean => {
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
