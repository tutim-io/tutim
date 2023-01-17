import { defaultFields, SelectField } from '@tutim/fields';
import { FormProvider } from '@tutim/headless';
import React from 'react';
import {
  BasicFieldsScheme,
  BasicFieldsValues,
  InitialFields,
  FieldValidations,
  DynamicState,
  FieldLogicRender,
  DesignSystem,
  TutimForm,
  LayoutConfig,
  FormWizard,
  ConfigProvider,
  SimpleForm,
  MultiNested,
  DeepNested,
  Builder,
  ControlledForm,
  SchemaServe,
  FormMeta,
} from './Forms';
import formConfig from './basic.json';

const contextOptions = {
  clientId: '2',
  forms: { ['form-config-1337']: formConfig },
};

const examples: Record<string, () => JSX.Element> = {
  TutimForm: TutimForm,
  BasicFieldsScheme: BasicFieldsScheme,
  BasicFieldsValues: BasicFieldsValues,
  InitialFields: InitialFields,
  FieldValidations: FieldValidations,
  DynamicState: DynamicState,
  FieldLogicRender: FieldLogicRender,
  DesignSystem: DesignSystem,
  LayoutConfig: LayoutConfig,
  FormWizard: FormWizard,
  ConfigProvider: ConfigProvider,
  SimpleForm: SimpleForm,
  MultiNested: MultiNested,
  DeepNested: DeepNested,
  Builder: Builder,
  ControlledForm: ControlledForm,
  SchemaServe: SchemaServe,
  FormMeta: FormMeta,
};

const options = Object.keys(examples).map((key, ix) => ({ value: key, label: `${ix}) => ${key}` }));

function App(): React.ReactNode {
  const [exampleKey, setExample] = React.useState(options[17].value);
  const Example = examples[exampleKey];

  return (
    <div>
      <div style={{ padding: '10px', borderBottom: '4px solid green', marginBottom: '30px' }}>
        <h3>Pick any form example</h3>
        <SelectField
          fieldConfig={{ key: 'select', label: 'Example', type: 'select', options }}
          inputProps={{
            value: exampleKey,
            onChange: (e: any) => setExample(e.target.value),
          }}
        />
      </div>
      <FormProvider fieldComponents={defaultFields} options={contextOptions}>
        {<Example />}
      </FormProvider>
    </div>
  );
}

export default App;
