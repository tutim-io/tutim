import { Control, Controller } from 'react-hook-form';
import { FieldComponents, FieldConfig, Validation } from '@tutim/types';
import React from 'react';

const getRegexRuleIfValid = (regex: Validation | undefined) => {
  try {
    const pattern =
      typeof regex?.value === 'string'
        ? {
            value: new RegExp(regex.value),
            message: regex.message ?? 'Invalid pattern',
          }
        : undefined;
    return pattern;
  } catch (err) {
    return undefined;
  }
};

const getFormRules = (isRequired: boolean, validations: FieldConfig['validations'] = {}) => {
  const pattern = getRegexRuleIfValid(validations.pattern);

  const rules = {
    ...validations,
    required: { value: isRequired, message: 'field is required' },
    pattern,
  };
  return rules;
};

export const getField = (control: Control, fieldComponents: FieldComponents) => {
  // eslint-disable-next-line react/display-name
  return (fieldConfig: FieldConfig) => {
    const { key, isRequired = false, validations } = fieldConfig;
    const rules = getFormRules(isRequired, validations);

    return (
      <Controller
        key={key}
        name={key as never}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const Field = fieldConfig.Field || fieldComponents[fieldConfig.type];

          return (
            <FieldRegistry control={control} fieldKey={fieldConfig.key}>
              <Field fieldConfig={fieldConfig} inputProps={field} fieldState={fieldState} />
            </FieldRegistry>
          );
        }}
      />
    );
  };
};

const FieldRegistry = ({ control, fieldKey, children }) => {
  React.useEffect(() => {
    return () => control.unregister(fieldKey);
  }, []);
  return children;
};
