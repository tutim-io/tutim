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
  // [InputType.Date]: DateField,
  [InputType.Number]: NumberField,
  // [InputType.Password]: PasswordField,
  // [InputType.TextArea]: TextAreaField,
  // [InputType.Select]: SelectField,
  // [InputType.Radio]: RadioField,
  // [InputType.Checkbox]: CheckboxField,
  // [InputType.Switch]: SwitchField,
  // [InputType.Json]: JsonField,
  [InputType.Text]: TextField,
  [InputType.Array]: FieldArray,
  [WrapperType.MultiStepWizard]: MuiTutimWizard as any, //TODO: fix this hack,
  [WrapperType.SingleStepForm]: SinglePageForm as any, //TODO: fix this hack,
};
