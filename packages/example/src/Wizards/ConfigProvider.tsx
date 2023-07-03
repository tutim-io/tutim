import React from 'react';
import { TutimWizard } from '@tutim/headless';
import { useFormConfig, useTutimOptions } from '@tutim/headless';
import { getDataAsync } from '../utils';

export const BasicConfigProvider = ({ formId }: { formId: string }): JSX.Element => {
  const config = useFormConfig(formId);
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return <TutimWizard onSubmit={onSubmit} config={config} />;
};

export const ConfigProvider = (): JSX.Element => {
  const [formId, setFormId] = React.useState('form-config-1337');
  const { setOptions } = useTutimOptions();

  React.useEffect(() => {
    getDataAsync().then((data) => {
      const config = {
        fields: [
          {
            key: 'name',
            label: data.firstName,
            type: 'text',
          },
        ],
      };
      setOptions({ forms: { ['form-config-async-1337']: config } });
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
