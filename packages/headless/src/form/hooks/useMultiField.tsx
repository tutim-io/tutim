import { FieldConfig, FieldsByKey, FormLayout } from '@tutim/types';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { getDefaults } from './useFormConfig';
import { useFormLayout } from './useFormLayout';
import { predicateDisplayIf } from './useRenderLogic';

const getRelativeKey = (key: string): string | undefined => {
  const [key1, key2] = key.split('.');
  if (key1 === '$' && key2) return key2;
};

const getRelativeWatchedKeys = (parentConfig: FieldConfig): string[] => {
  if (!parentConfig.children) return [];
  const keys = parentConfig.children.fields.reduce((acc: string[], config) => {
    const { displayIf } = config.logic || {};
    if (!displayIf) return acc;
    const relativeKey = getRelativeKey(displayIf.field);
    if (relativeKey) acc.push(relativeKey);
    return acc;
  }, []);
  return keys;
};

const computeArrayFields = (parentConfig: FieldConfig, itemValue: Record<string, never>) => {
  if (!parentConfig.children) return { fields: [] };
  const relativeArrayFilter = predicateDisplayIf(itemValue);
  const childFields = parentConfig.children.fields.map((config) => {
    try {
      const { displayIf } = config.logic || {};
      if (!displayIf) return config;
      const relativeKey = getRelativeKey(displayIf.field);
      if (relativeKey) {
        return { ...config, logic: { ...config.logic, displayIf: { ...displayIf, field: relativeKey } } };
      }
      return { ...config, logic: { ...config.logic, displayIf: undefined } };
    } catch (err) {
      console.error(err);
      return config;
    }
  });
  const fields = childFields.filter(relativeArrayFilter);

  const children = { fields };
  return children;
};

const watchIfRelativeKeys = (config: FieldConfig): string[] => {
  const keys = getRelativeWatchedKeys(config);
  return keys.length ? [config.key] : [];
};

interface UseMulti {
  parentConfig: FieldConfig;
  control: Control;
  configsToMap: (configs: FieldConfig[]) => FieldsByKey;
  layoutConfig?: FormLayout;
}

export const useMultiField = ({ parentConfig, control, configsToMap, layoutConfig }: UseMulti) => {
  if (!parentConfig.children) throw new Error('Only supports multi nested fields');
  const { fields, append, remove } = useFieldArray({ control, name: parentConfig.key });
  const { error } = control.getFieldState(parentConfig.key);
  const watchedKey = watchIfRelativeKeys(parentConfig);
  const [arrayValues] = useWatch({ control, name: watchedKey, defaultValue: [{}] });
  const layout = useFormLayout({ layout: layoutConfig, fields: parentConfig.children.fields });

  const onAdd = () => {
    if (!parentConfig.children) return;
    const defaultAddValue = getDefaults(parentConfig.children.fields);
    return append(defaultAddValue);
  };

  const onDelete = (id: number) => () => remove(id);

  const arrayFields = fields.map((item, ix) => {
    if (!parentConfig.children) return;
    const children = computeArrayFields(parentConfig, arrayValues?.[ix] || {});
    const configs = children.fields.map((config) => ({ ...config, key: `${parentConfig.key}.${ix}.${config.key}` }));
    const fieldsByKey = configsToMap(configs);
    return { id: item.id, fieldsByKey, onDelete: onDelete(ix) };
  });

  return { onAdd, arrayFields, layout, error };
};

export const FieldArray = (props: UseMulti & { UiFieldArray: any }): JSX.Element => {
  // for unknown reason, react-hook-form re-render the whole form if you don't encapsulate FieldArray

  return <FieldArrayHack key={props.parentConfig.key} {...props} />;
};

export const FieldArrayHack = ({
  parentConfig,
  control,
  configsToMap,
  layoutConfig,
  UiFieldArray,
}: UseMulti & { UiFieldArray: any }): JSX.Element => {
  const multiProps = useMultiField({ parentConfig, control, configsToMap, layoutConfig });
  return <UiFieldArray key={parentConfig.key} multiProps={multiProps} fieldConfig={parentConfig} />;
};
