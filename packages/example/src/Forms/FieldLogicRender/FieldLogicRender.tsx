import React from 'react';
import { useForm } from '@tutim/headless';
import config from './basic.json';

export const FieldLogicRender = (): JSX.Element => {
  const { fields, handleSubmit } = useForm(config);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <input type="submit" value="submit" />
    </form>
  );
};
