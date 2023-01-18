import { UseFormReturn as RHFUseFormReturn, UseFormProps as RHFUseFormProps } from 'react-hook-form';

/**
 * input field types, can add any input that you want and register with `FormProvider` or use with `Custom` `type` and `Field` prop.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/

export enum InputType {
  Text = 'text',
  Select = 'select',
  Radio = 'radio',
  Switch = 'switch',
  Checkbox = 'checkbox',
  Number = 'number',
  Date = 'date',
  Password = 'password',
  TextArea = 'text-area',
  Json = 'json',
  MultiText = 'multi-text',
  Object = 'object',
  Array = 'array',
  Custom = 'custom',
}

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface Validation {
  value?: number | boolean | string;
  message?: string;
}

interface BasicLogic {
  field: string;
  operator: string;
  value: any;
}
interface FieldLogic {
  displayIf?: BasicLogic;
}

export enum Operators {
  EQUAL = 'equal',
  IN = 'in',
}

export interface MultiConfig {
  editable?: boolean;
  addable?: boolean;
  deleteable?: boolean;
  max?: number;
}

/**
 * field configuration options.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/
export interface FieldConfig {
  key: string;
  type: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  options?: Option[];
  defaultValue?: any;
  validations?: Record<string, Validation | undefined>;
  logic?: FieldLogic;
  Field?: Field;
  children?: Pick<FormConfig, 'fields'>;
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

export interface WizardLayout {
  steps?: { order?: string[] };
}

export interface LayoutGroupConfigsGroup {
  key: string;
  fieldKeys: string[];
  title?: string;
  subGroups?: LayoutGroupConfigs;
  layout?: Pick<FormLayout, 'fieldsPerRow'>;
}

export interface LayoutGroupConfigs {
  groups?: LayoutGroupConfigsGroup[];
  layout?: Record<string, Pick<FormLayout, 'fieldsPerRow'>>;
}

export interface LayoutArrayConfig {
  [key: string]: FormLayout;
}

export interface FormMeta {
  title?: string;
  description?: string;
  version?: string;
}
export interface FormLayout {
  style?: any;
  wizard?: WizardLayout;
  groupConfigs?: LayoutGroupConfigs;
  arrayConfigs?: LayoutArrayConfig;
  fieldsPerRow?: FieldsPerRow;
  submitLabel?: string;
}

export interface FormLogic {
  submissionPage?: { allowResubmit?: boolean };
}

export enum FieldsPerRow {
  One = 1,
  Two = 2,
  Three = 3,
}

export type PartialFieldConfig = Partial<FieldConfig> & Pick<FieldConfig, 'key'>;

/**
 * form configuration
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/
export interface FormConfig {
  fields: FieldConfig[];
  layout?: FormLayout;
  logic?: FormLogic;
  meta?: FormMeta;
  id?: string;
}

/**
 * form configuration
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 **/
export interface PartialFormConfig {
  fields: PartialFieldConfig[];
  layout?: FormLayout;
  logic?: FormLogic;
  meta?: FormMeta;
  id?: string;
}

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

export type FieldComponents = Record<string, Field>;

export interface TutimOptions {
  forms: Record<string, FormConfig>;
  clientId?: string;
}
export interface TutimOptionsProviderValue {
  options: TutimOptions;
  setOptions: (config: TutimOptions) => void;
}
export interface FormProviderProps {
  fieldComponents?: FieldComponents;
  options?: Partial<TutimOptions>;
  children: React.ReactNode;
}

export type FieldsByKey = Record<string, React.ReactNode>;

export type OnSubmit = (values: { data: any; schema: FormConfig }) => void;

export type UseFormInit = (getData: () => Promise<Record<string, any> | undefined>) => boolean;

export interface TutimFormReturn {
  schema: FormConfig;
  fields: React.ReactNode[];
  fieldsByKey: FieldsByKey;
  layout: FormLayout;
  logic: FormLogic;
  meta: FormMeta;
  useFormInit: UseFormInit;
  nativeSubmit: (onSubmit: OnSubmit) => React.FormEventHandler<HTMLFormElement>;
  error?: unknown;
}

export type UseFormReturn = RHFUseFormReturn<any> & TutimFormReturn;
export type UseFormOptions = RHFUseFormProps<any>;
