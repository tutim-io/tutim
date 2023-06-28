import React from 'react';
import { TutimWizard } from '@tutim/headless';
import { Field } from '@tutim/types';


const configBase = {
  "logic": { "submissionPage": {} },
  "fields": [
    {
      "key": "firstName",
      "label": "First Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": true
    },
    {
      "key": "lastName",
      "label": "Last Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": false,
      "defaultValue": "no last"
    },
    {
      "key": "role",
      "label": "Role",
      "isDisabled": false,
      "type": "select",
      "options": [
        { "value": "admin", "label": "Administrator" },
        { "value": "viewer", "label": "Viewer", "disabled": true },
        { "value": "editor", "label": "Editor" }
      ],
      "isRequired": false,
      "defaultValue": "editor"
    },
    {
      "key": "hosting",
      "label": "Hosting",
      "isDisabled": false,
      "type": "radio",
      "options": [
        { "value": "self", "label": "Self-Host" },
        { "value": "cloud", "label": "Cloud", "disabled": true }
      ],
      "isRequired": false,
      "defaultValue": "self"
    },
    {
      "key": "agree",
      "label": "Agree to our terms and conditions",
      "isDisabled": false,
      "type": "checkbox",
      "isRequired": false
    },
    {
      "key": "enable",
      "label": "Enable this feature",
      "isDisabled": false,
      "type": "switch",
      "isRequired": false
    },
    {
      "key": "settings",
      "label": "User Settings",
      "isDisabled": false,
      "type": "json",
      "isRequired": false
    }
  ]
}


const CustomField: Field = ({ inputProps }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      Click Me: {value}
    </button>
  );
};

const customField = {
  key: 'clicker',
  label: 'Click Me',
  type: 'custom',
  defaultValue: 0,
  Field: CustomField,
};

const config = { ...configBase, fields: [...configBase.fields, customField] };

const initialValues = {
  firstName: 'sami',
  agree: true,
  enable: true,
  hosting: 'cloud',
};

export const TutimForm = (): JSX.Element => {
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return <TutimWizard onSubmit={onSubmit} config={config} initialValues={initialValues} />;
};
