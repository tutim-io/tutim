import React from 'react';
import { useForm } from '@tutim/headless';
import config from './basic.json';
import { getDataAsync } from '../../utils';

export const InitialFields = (): JSX.Element => {
  const { fields, handleSubmit, useFormInit } = useForm(config);
  const isInitializing = useFormInit(getDataAsync);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  if (!isInitializing) return <div>Loading</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <input type="submit" value="submit" />
    </form>
  );
};
