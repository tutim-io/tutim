import { FieldComponents, InputType } from '@tutim/types';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

export const defaultFields: FieldComponents = {
  [InputType.Select]: SelectField,
  [InputType.Text]: TextField,
};
