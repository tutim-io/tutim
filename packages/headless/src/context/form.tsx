import React from 'react';
import { FieldComponents, TutimConfig, FormProviderProps, TutimConfigProvider } from '@tutim/types';

export const FieldComponentsContext = React.createContext<FieldComponents>({});
export const useFieldComponents = (): FieldComponents => React.useContext(FieldComponentsContext);

const configContext = { config: { formConfigs: {} }, setConfig: () => {} };
export const TutimConfigContext = React.createContext<TutimConfigProvider>(configContext);
export const useTutimConfig = (): TutimConfigProvider => React.useContext(TutimConfigContext);

const mergeTutimConfigs = (config: TutimConfig, newConfig: TutimConfig) => {
  return { formConfigs: { ...config.formConfigs, ...newConfig.formConfigs } };
};

/**
 * a context provider to manage form infrastructure.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - all tutim form configurations and components.
 *
 * @example
 * ```tsx
 * import { FormProvider } from '@tutim/headless';
 * import { defaultFields } from '@tutim/fields';
 * import { FieldComponents } from '@tutim/types';
 * import { SimpleForm } from './SimpleForm';
 * import { CustomField } from './CustomField';
 *
 * const fieldComponents: FieldComponents = {
 *   ...defaultFields, // optional built in input fields based on MUI
 *   text: ({ inputProps }) => <input {...inputProps} />,
 *   'custom-field': (fieldProps) => <CustomField {...fieldProps} />,
 *   // add any type of input and reference it by 'inputType'
 * };
 *
 * export const App = (): JSX.Element => {
 *   return (
 *     <div className="App">
 *       <FormProvider fieldComponents={fieldComponents}>
 *         <SimpleForm />
 *       </FormProvider>
 *     </div>
 *   );
 * };
 * ```
 */
export const FormProvider = ({
  fieldComponents,
  config = configContext.config,
  children,
}: FormProviderProps): JSX.Element => {
  if (!fieldComponents) throw new Error('fieldComponents is required');
  const [stateConfig, setStateConfig] = React.useState(config);
  const configContextValue = {
    config: stateConfig,
    setConfig: (newConfig: TutimConfig) => setStateConfig(mergeTutimConfigs(stateConfig, newConfig)),
  };
  return (
    <FieldComponentsContext.Provider value={fieldComponents}>
      <TutimConfigContext.Provider value={configContextValue}>{children}</TutimConfigContext.Provider>
    </FieldComponentsContext.Provider>
  );
};
