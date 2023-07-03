import { defaultFields, SelectField } from '@tutim/fields'; //material-ui
import { TutimProvider } from '@tutim/headless';
import React from 'react';

// import {
//   // BasicFieldsScheme,
//   // BasicFieldsValues,
//   // InitialFields,
//   // FieldValidations,
//   // DynamicState,
//   // FieldLogicRender,
//   // DesignSystem,
//   // TutimForm,
//   // LayoutConfig,
//   // FormWizard,
//   // ConfigProvider,
//   // SimpleForm,
//   // MultiNested,
//   // DeepNested,
//   // Builder,
//   // ControlledForm,
//   // SchemaServe,
//   // FormMeta,
//   // BasicWizard,
//   // LogicWizard,
// } from './Forms';

import formConfig from './basic.json';
import { HeadlessWizard } from './Wizards/HeadlessWizard';
import { TutimWizardExample } from './Wizards/TutimWizardExample';
import { BasicFieldsValues } from './Wizards/BasicFieldsValues'
import { ConfigProvider } from './Wizards/ConfigProvider'
import { ControlledForm } from './Wizards/ControlledForm'
import { DesignSystem } from './Wizards/DesignSystem'
import { DynamicState } from './Wizards/DynamicState'
import { FieldLogicRender } from './Wizards/FieldLogicRender'
import { InitialFields } from './Wizards/InitialFields'

import { AllOfExamples } from './Wizards/AllOfExamples';

const contextOptions = {
  clientId: '2',
  forms: { ['form-config-1337']: formConfig },
};

const examples: Record<string, () => JSX.Element> = {
  // BasicFieldsScheme,
  // BasicFieldsValues,
  // InitialFields,
  // FieldValidations,
  // DynamicState,
  // FieldLogicRender,
  // DesignSystem,
  // LayoutConfig,
  // FormWizard,
  // ConfigProvider,
  // SimpleForm,
  // MultiNested,
  // DeepNested,
  // Builder,
  // ControlledForm,
  // SchemaServe,
  // FormMeta,
  // BasicWizard,
  HeadlessWizard,
  TutimWizardExample,
  BasicFieldsValues,
  ConfigProvider,
  ControlledForm,
  DesignSystem,
  DynamicState,
  FieldLogicRender,
  InitialFields,

  AllOfExamples,
};

const options = Object.keys(examples).map((key, ix) => ({ value: key, label: `${ix}) => ${key}` }));

function App(): React.ReactNode {
  const [exampleKey, setExample] = React.useState(options[options.length - 1].value);
  const Example = examples[exampleKey];

  return (
    <div>
      <div style={{ padding: '10px', borderBottom: '4px solid green', marginBottom: '30px' }}>
        <h3>Pick any form example - Material UI</h3>
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
  );
}

export default App;
