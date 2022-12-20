import React from 'react';
import * as RHF from 'react-hook-form';
import { FieldConfig } from '@tutim/types';
import { getExistsMap } from '../../utils';

const getKeys = (fields: FieldConfig[]) => {
  const keys = fields.reduce((prev: string[], config) => {
    prev.push(config.key);
    if (config.children) {
      const childrenFields = config.children.fields.map((c) => `${config.key}.${c.key}`);
      prev.push(...childrenFields);
    }
    return prev;
  }, []);
  return keys;
};

export const useFormFieldsInternalState = (
  renderedFields: FieldConfig[],
  unregister: RHF.UseFormUnregister<Record<string, any>>
) => {
  const [registeredFields, setRegisteredFields] = React.useState({});

  React.useEffect(() => {
    const keys = getKeys(renderedFields);
    const map = getExistsMap(keys);
    if (JSON.stringify(map) !== JSON.stringify(registeredFields)) {
      const existingKeys = Object.keys(registeredFields);
      const unregistered = existingKeys.filter((key) => !map[key]);
      if (unregistered.length) unregister(unregistered);
      setRegisteredFields(map);
    }
  }, [renderedFields]);
};
