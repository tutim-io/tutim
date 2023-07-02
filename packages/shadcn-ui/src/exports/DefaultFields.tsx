import { FieldComponents, InputType, WrapperType } from '@tutim/types';
import { SinglePageForm } from './Forms';
import { MuiTutimWizard } from './Wizards';
import {
  DateField,
  NumberField,
  PasswordField,
  TextAreaField,
  MultiTextField,
  MultiSelectField,
  MultiCheckboxField,
  CheckboxField,
  RadioField,
  SelectField,
  SwitchField,
  JsonField,
  TextField,
  FieldArray
} from './Fields';

export const defaultFields: FieldComponents = {
  // [InputType.MultiText]: MultiTextField,
  // [InputType.MultiSelect]: MultiSelectField,
  // [InputType.MultiCheckbox]: MultiCheckboxField,
  // [InputType.Password]: PasswordField,
  // [InputType.TextArea]: TextAreaField,
  // [InputType.Select]: SelectField,
  // [InputType.Radio]: RadioField,
  // [InputType.Switch]: SwitchField,
  [InputType.Json]: JsonField,
  [InputType.Checkbox]: CheckboxField,
  [InputType.Date]: DateField,
  [InputType.Number]: NumberField,
  [InputType.Text]: TextField,
  [InputType.Array]: FieldArray,
  [WrapperType.MultiStepWizard]: MuiTutimWizard as any, //TODO: fix this hack,
  [WrapperType.SingleStepForm]: SinglePageForm as any, //TODO: fix this hack,
};
