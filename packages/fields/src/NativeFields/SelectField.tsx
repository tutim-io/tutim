import { Option, Field } from '@tutim/types';

export const SelectField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, options } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };

  const renderOption = (option: Option) => (
    <option key={option.value} value={option.value} disabled={option.disabled}>
      {option.label}
    </option>
  );

  return (
    <div key={key}>
      <label>{label}</label>
      {options && (
        <select value={value} onChange={onSelectChange}>
          {options.map(renderOption)}
        </select>
      )}
      {error.message && <span>{error.message}</span>}
    </div>
  );
};
