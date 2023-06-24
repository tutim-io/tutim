import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SelectField } from '@tutim/fields'; //material-ui
import { TutimProvider } from '@tutim/headless';
import '@tutim/shadcn-ui/dist/output.css';
import formConfig from './basic.json';
import { HeadlessWizard } from './Wizards/HeadlessWizard';
import { TutimWizardExample } from './Wizards/TutimWizardExample';
import { defaultFields } from '@tutim/shadcn-ui';

const contextOptions = {
  clientId: '2',
  forms: { ['form-config-1337']: formConfig },
};

const examples: Record<string, () => JSX.Element> = {
  HeadlessWizard,
  TutimWizardExample,
};

const options = Object.keys(examples).map((key, ix) => ({ value: key, label: `${ix}) => ${key}` }));

function App(): React.ReactNode {
  const [exampleKey, setExample] = React.useState(options[options.length - 1].value);
  const Example = examples[exampleKey];

  return (
    <BrowserRouter>
      <div>
        <div style={{ padding: '10px', borderBottom: '4px solid green', marginBottom: '30px' }}>
          <h3>Pick any wizard example - Shadcn UI</h3>
          <SelectField
            fieldConfig={{ key: 'select', label: 'Example', type: 'select', options }}
            inputProps={{
              value: exampleKey,
              onChange: (e: any) => setExample(e.target.value),
            }}
          />
        </div>
        <TutimProvider fieldComponents={defaultFields} options={contextOptions}>
          {<Example />}
        </TutimProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
