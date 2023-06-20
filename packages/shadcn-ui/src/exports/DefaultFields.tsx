import { FieldComponents, InputType, WrapperType } from '@tutim/types';
import { SinglePageForm } from './Forms';
import { MuiTutimWizard } from './Wizards';
import { TextField } from './Fields';

export const defaultFields: FieldComponents = {
  [InputType.Text]: TextField,
  [WrapperType.MultiStepWizard]: MuiTutimWizard as any, //TODO: fix this hack,
  [WrapperType.SingleStepForm]: SinglePageForm as any, //TODO: fix this hack,
};
