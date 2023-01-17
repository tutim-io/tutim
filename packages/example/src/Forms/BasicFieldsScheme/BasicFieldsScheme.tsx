import React from 'react';
import { useForm } from '@tutim/headless';
import config from './basic.json';

export const BasicFieldsScheme = (): JSX.Element => {
  const { fields, nativeSubmit } = useForm(config);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={nativeSubmit(onSubmit)}>
      {fields}
      <input type="submit" value="submit" />
    </form>
  );
};
