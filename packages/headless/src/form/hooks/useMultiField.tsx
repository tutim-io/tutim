import { FieldConfig, FieldLogic, FieldsByKey, FieldsLogic, FormLayout, FormLogic } from '@tutim/types';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { getDefaults } from './useFormConfig';
import { useFormLayout } from './useFormLayout';
import { computeRenderedConfigs, predicateDisplayIf } from './useRenderLogic';

const getRelativeKey = (key: string): string | undefined => {
  const [key1, key2] = key.split('.');
  if (key1 === '$' && key2) return key2;
};

const getRelativeWatchedKeys = (fieldsLogic: FieldsLogic): string[] => {
  if (!fieldsLogic) return [];

  const keys = Object.values(fieldsLogic).reduce((acc: string[], { displayIf } = {}) => {
    if (!displayIf) return acc;
    const relativeKey = getRelativeKey(displayIf.field);
    if (relativeKey) acc.push(relativeKey);
    return acc;
  }, []);
  return keys;
};

const getRelativeFieldsLogic = (fieldsLogic: FieldsLogic): FieldsLogic => {
  if (!fieldsLogic) return {};

  const relativeFieldsLogic = Object.entries(fieldsLogic).reduce((acc: FieldsLogic, [key, fieldLogic]) => {
    if (!fieldLogic?.displayIf) return acc;
    const relativeKey = getRelativeKey(fieldLogic.displayIf.field);
    if (relativeKey) {
      const relativeFieldLogic = { ...fieldLogic, displayIf: { ...fieldLogic.displayIf, field: relativeKey } };
      acc[key] = relativeFieldLogic;
    }
    return acc;
  }, {});
  return relativeFieldsLogic;
};

const computeArrayFields = (parentConfig: FieldConfig, itemValue: Record<string, never>, fieldsLogic: FieldsLogic) => {
  if (!parentConfig.children) return { fields: [] };
  const relativeFieldsLogic = getRelativeFieldsLogic(fieldsLogic);
  const fields = computeRenderedConfigs(itemValue)({
    fields: parentConfig.children.fields,
    logic: { fieldsLogic: relativeFieldsLogic },
  });

  const children = { fields };
  return children;
};

const watchIfRelativeKeys = (config: FieldConfig, fieldsLogic: FieldsLogic): string[] => {
  const keys = getRelativeWatchedKeys(fieldsLogic);
  return keys.length ? [config.key] : [];
};

interface UseMulti {
  parentConfig: FieldConfig;
  control: Control;
  configsToMap: (configs: FieldConfig[]) => FieldsByKey;
  layoutConfig?: FormLayout;
  logic?: FieldsLogic;
}

export const useMultiField = ({ parentConfig, control, configsToMap, layoutConfig, logic = {} }: UseMulti) => {
  if (!parentConfig.children) throw new Error('Only supports multi object fields');
  const { fields, append, remove } = useFieldArray({ control, name: parentConfig.key });
  const { error } = control.getFieldState(parentConfig.key);
  const watchedKeys = watchIfRelativeKeys(parentConfig, logic);
  const [arrayValues] = useWatch({ control, name: watchedKeys, defaultValue: [{}] });
  const layout = useFormLayout({ layout: layoutConfig, fields: parentConfig.children.fields });

  const onAdd = () => {
    if (!parentConfig.children) return;
    const defaultAddValue = getDefaults(parentConfig.children.fields);
    return append(defaultAddValue);
  };

  const onDelete = (id: number) => () => remove(id);

  const arrayFields = fields.map((item, ix) => {
    if (!parentConfig.children) return;
    const children = computeArrayFields(parentConfig, arrayValues?.[ix] || {}, logic);
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
  logic,
}: UseMulti & { UiFieldArray: any }): JSX.Element => {
  const multiProps = useMultiField({ parentConfig, control, configsToMap, layoutConfig, logic });
  return <UiFieldArray key={parentConfig.key} multiProps={multiProps} fieldConfig={parentConfig} />;
};
