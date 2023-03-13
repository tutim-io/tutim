import { FieldComponents, InputType } from '@tutim/types';
import { SelectField } from './SelectField';
import { TextField } from './TextField';
import { RadioField } from './RadioField';
import { CheckboxField } from './CheckboxField';
import { SwitchField } from './SwitchField';
import { JsonField } from './JsonField';
import { MultiTextField } from './MultiTextField';
import { MultiSelectField } from './MultiSelectField';
import { FieldArray } from './SpecialFields';
import { DateField } from './DateField';
import { NumberField } from './NumberField';
import { PasswordField } from './PasswordField';
import { TextAreaField } from './TextAreaField';

export const defaultFields: FieldComponents = {
  [InputType.Select]: SelectField,
  [InputType.Text]: TextField,
  [InputType.Radio]: RadioField,
  [InputType.Checkbox]: CheckboxField,
  [InputType.Switch]: SwitchField,
  [InputType.Date]: DateField,
  [InputType.Number]: NumberField,
  [InputType.Password]: PasswordField,
  [InputType.TextArea]: TextAreaField,
  [InputType.Json]: JsonField,
  [InputType.MultiText]: MultiTextField,
  [InputType.MultiSelect]: MultiSelectField,
  [InputType.Array]: FieldArray,
};
