import React from 'react';
import { Form } from '@tutim/fields';
import { useFormConfig, useTutimConfig } from '@tutim/headless';
import { getDataAsync } from '../../utils';

export const BasicConfigProvider = ({ formId }: { formId: string }): JSX.Element => {
  const config = useFormConfig(formId);
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return <Form onSubmit={onSubmit} config={config} />;
};

export const ConfigProvider = (): JSX.Element => {
  const [formId, setFormId] = React.useState('form-config-1337');
  const { setConfig } = useTutimConfig();

  React.useEffect(() => {
    getDataAsync().then((data) => {
      const config = {
        fields: [
          {
            key: 'name',
            label: data.firstName,
            inputType: 'text',
          },
        ],
      };
      setConfig({ formConfigs: { ['form-config-async-1337']: config } });
    });
  }, []);

  return (
    <div>
      <BasicConfigProvider formId={formId} />
      <button type="button" onClick={() => setFormId('form-config-async-1337')}>
        Switch To Async Config
      </button>
    </div>
  );
};
