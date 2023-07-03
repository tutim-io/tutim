import React from 'react';
import { useForm } from '@tutim/headless';

import { getSelectOptionsAsync } from '../utils';

const config = {
  "fields": [
    {
      "key": "firstName",
      "label": "Name",
      "isDisabled": false,
      "type": "text",
      "isRequired": true
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
      "isRequired": true
    }
  ]
}

const additionalField = {
  key: 'additional',
  label: 'Additional Name',
  isDisabled: false,
  type: 'text',
  isRequired: true,
};

const overrideField = {
  key: 'lastName',
  label: 'Last Name Changed',
  isDisabled: true,
  type: 'text',
  isRequired: true,
};

export const DynamicState = (): JSX.Element => {
  const [stateConfig, setStateConfig] = React.useState([]);
  const { fields, handleSubmit } = useForm(config, { fields: stateConfig });

  React.useEffect(() => {
    getSelectOptionsAsync().then((options) => {
      setStateConfig([{ key: 'role', options }]);
    });
  }, []);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const onButtonClick = () => {
    setStateConfig((Math.random() > 0.5 ? [additionalField, overrideField] : []) as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <input type="submit" value="submit" />
      <button type="button" onClick={onButtonClick}>
        Random Fields Change
      </button>
    </form>
  );
};
