import React from 'react';
import { useForm } from '@tutim/headless';
import { getDataAsync } from '../utils';

const config = {
  "fields": [
    {
      "key": "firstName",
      "label": "Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": true,
      "defaultValue": "defaultName"
    },
    {
      "key": "lastName",
      "label": "Last Name",
      "isDisabled": true,
      "type": "text",
      "isRequired": true
    },
    {
      "key": "role",
      "label": "Role",
      "isDisabled": false,
      "type": "select",
      "options": [
        { "value": "admin", "label": "Administrator" },
        { "value": "viewer", "label": "Viewer" },
        { "value": "editor", "label": "Editor" }
      ],
      "isRequired": true,
      "defaultValue": "editor"
    }
  ]
}

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
