import { Field } from '@tutim/types';

import { Label } from "../../components/ui/label"
import { Switch } from '../../components/ui/switch';
 
import { FieldWrapper } from './FieldWrapper';





export const SwitchField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, label } = fieldConfig;

  return (
    <div className="flex items-center space-x-2">
      <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}  >

        
        <Switch id= 'Switch field' />
          <Label htmlFor='Switch field' > Switch field </Label>

      

      </FieldWrapper >
    </div>
  );
};
