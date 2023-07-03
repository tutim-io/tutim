import React from 'react';
import { useForm } from '@tutim/headless';

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
      "isDisabled": false,
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

export const BasicFieldsValues = (): JSX.Element => {
  const { fields, handleSubmit } = useForm(config);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <input type="submit" value="submit" style={{ background: 'pink' }} />
    </form>
  );
};
