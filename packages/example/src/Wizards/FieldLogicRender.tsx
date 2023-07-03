import React from 'react';
import { useForm } from '@tutim/headless';

const config = {
  "fields": [
    {
      "key": "firstName",
      "label": "Name (conditional)",
      "isDisabled": false,
      "type": "text",
      "isRequired": true
    },
    {
      "key": "lastName",
      "label": "Last Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": true,
      "logic": {
        "displayIf": { "field": "firstName", "operator": "equal", "value": "conditional" }
      }
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
    },
    {
      "key": "additional",
      "label": "Additional Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": true,
      "logic": {
        "displayIf": { "field": "role", "operator": "equal", "value": "admin" }
      }
    },
    {
      "key": "hosting",
      "label": "Hosting",
      "isDisabled": false,
      "type": "radio",
      "options": [
        { "value": "self", "label": "Self-Host" },
        { "value": "cloud", "label": "Cloud" }
      ],
      "isRequired": true,
      "defaultValue": "self"
    },
    {
      "key": "agree",
      "label": "Agree to our terms and conditions",
      "isDisabled": false,
      "type": "checkbox",
      "isRequired": true
    },
    {
      "key": "enable",
      "label": "Enable this feature",
      "isDisabled": false,
      "type": "switch",
      "isRequired": true
    }
  ]
}


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
