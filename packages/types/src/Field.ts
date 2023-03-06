import { FieldConfig } from './FieldConfig';
import { FormLayout } from './FormLayout';

export interface ArrayFieldsProps {
  id: string;
  fieldsByKey: FieldsByKey;
  onDelete: () => void;
}

export interface MultiProps {
  onAdd: () => void;
  arrayFields: ArrayFieldsProps[];
  layout?: FormLayout;
  error?: any;
}

export interface InputProps {
  value: any;
  onChange: (newValue: InputProps['value']) => void;
}

export interface InputState {
  invalid?: boolean;
  error?: { message?: string };
}

export interface FieldProps {
  fieldConfig: FieldConfig;
  inputProps: InputProps;
  fieldState?: InputState;
  multiProps?: MultiProps;
}
/**
 * an input field type to use within forms.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - all tutim form configurations and components.
 *
 * @example
 * ```tsx
 * export const CustomField: Field = ({ inputProps }) => {
 *   const { value, onChange } = inputProps;
 *   const onClick = () => onChange(value + 2);
 *   return (
 *     <button type="button" onClick={onClick}>
 *       Click Me: {value}
 *     </button>
 *   );
 * };
 *
 * export const customFieldConfig: FieldConfig = {
 *   key: 'clicker',
 *   label: 'Click Me',
 *   type: 'custom',
 *   defaultValue: 0,
 *   Field: CustomField,
 * };
 * ```
 */

export type Field = (props: FieldProps) => JSX.Element;

export type FieldComponents = Record<string, Field>;

export type FieldsByKey = Record<string, React.ReactNode>;
