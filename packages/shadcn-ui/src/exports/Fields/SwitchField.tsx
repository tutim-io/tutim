import { Field } from '@tutim/types';
import { Label } from "../../components/ui/label"
import { Switch } from '../../components/ui/switch';
 
import { FieldWrapper } from '../utils';

export const SwitchField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, label } = fieldConfig;

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Label label={label} control={<Switch key={key} checked={value} onChange={onChange} />} />
    </FieldWrapper>
  );
};
