import { FieldConfig, InputType, Operators, Option } from '@tutim/types';

interface OldSchemaField {
  name: string;
  type: string;
  items?: Option[];
  label?: string;
  placeholder?: string;
  inputType?: string;
  columns?: {
    container: number;
    label?: number;
    wrapper?: number;
  };
  conditions?: Array<Array<string | number>>;
  search?: boolean;
  default?: string;
  canClear?: boolean;
  canDeselect?: boolean;
  [key: string]: any;
}

const mapConditions = (oldConditions: OldSchemaField['conditions']) => {
  const [condition] = oldConditions || [];
  if (!condition) return;
  const [field, operator, value] = condition;
  if (operator === 'in' || operator === '==') {
    const parsedOperator = operator === '==' ? Operators.EQUAL : Operators.IN;
    const displayIf = { field: String(field), operator: parsedOperator, value };
    return { displayIf };
  }
};

const fieldFilter = (field: OldSchemaField) => {
  return Object.values(InputType).includes(field.type as any);
};

export const schemaTranform = (oldSchema: Record<string, OldSchemaField>): FieldConfig[] => {
  const oldFields: OldSchemaField[] = Object.values(oldSchema);
  const transformSchema = (oldSchema: OldSchemaField): FieldConfig => {
    const field = {
      key: oldSchema.name,
      type: oldSchema.inputType || oldSchema.type,
      label: oldSchema.label || oldSchema.text,
      options: oldSchema.items,
      logic: mapConditions(oldSchema.conditions),
    };
    return field;
  };
  const relevantFields = oldFields.filter(fieldFilter);
  const fields = relevantFields.map(transformSchema);
  return fields;
};
