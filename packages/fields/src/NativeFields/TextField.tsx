import { Field } from '@tutim/types';

export const TextField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isDisabled, isRequired } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div key={key}>
      <label>{label}</label>
      <input required={isRequired} value={value ?? ''} onChange={onInputChange} disabled={isDisabled} />
      {error.message && <span>{error.message}</span>}
    </div>
  );
};
