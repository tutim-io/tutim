import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import { Checkbox } from '../../components/ui/checkbox'

export const CheckboxField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, helperText } = fieldConfig;

  return (
    <FieldWrapper fieldConfig={{ ...fieldConfig, helperText: undefined }} fieldState={fieldState}>
      <Checkbox checked={value} onCheckedChange={onChange} id="terms" key={key} className='mt-1'/>
      <label htmlFor="terms">
        {helperText}
      </label>
    
    </FieldWrapper>
  );
};
