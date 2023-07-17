import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TutimProvider } from '@tutim/headless';
import '@tutim/shadcn-ui/dist/output.css';
import formConfig from './basic.json';

import { HeadlessWizard } from './Wizards/HeadlessWizard';
import { AllOfExamples } from './Wizards/AllOfExamples';
import { ShaniForm } from './Wizards/ShaniForm';

import { defaultFields, SelectField } from '@tutim/shadcn-ui';
import { defaultFields as defaultFieldsMatirial, SelectField as SelectFieldMatirial } from '@tutim/fields'; //material-ui

const contextOptions = {
  clientId: '3',
  forms: { ['form-config-1337']: formConfig },
};

const examples: Record<string, () => JSX.Element> = {
  HeadlessWizard,
  AllOfExamples,
  ShaniForm,
};

const options = Object.keys(examples).map((key, ix) => ({ value: key, label: `${ix}) => ${key}` }));

function App(): React.ReactNode {
  const [exampleKey, setExample] = React.useState(options[options.length - 1].value);
  const Example = examples[exampleKey];

  return (
    <BrowserRouter>
      <div>
        <div style={{ padding: '30px', borderBottom: '4px solid green', marginBottom: '30px' }}>
          <h3>left side:Shadcn UI | right side:MatiralUI</h3>
          <SelectField
            fieldConfig={{ key: 'select', label: 'Example', type: 'select', options }}
            inputProps={{
              value: exampleKey,
              onChange: (e: any) => setExample(e.target.value),
            }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
          <TutimProvider fieldComponents={defaultFields} options={contextOptions}>
            {<Example />}
          </TutimProvider>

          <TutimProvider fieldComponents={defaultFieldsMatirial} options={contextOptions}>
            {<Example />}
          </TutimProvider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
