import React from 'react';
import { FieldComponents, TutimOptions, FormProviderProps, TutimOptionsProviderValue } from '@tutim/types';
import { useRemoteSchemas } from './useRemoteSchemas';

export const FieldComponentsContext = React.createContext<FieldComponents>({});
export const useFieldComponents = (): FieldComponents => React.useContext(FieldComponentsContext);

const optionsContext: TutimOptionsProviderValue = { options: { forms: {} }, setOptions: () => null };
export const TutimOptionsContext = React.createContext<TutimOptionsProviderValue>(optionsContext);
export const useTutimOptions = (): TutimOptionsProviderValue => React.useContext(TutimOptionsContext);

const mergeTutimOptions = (options: Partial<TutimOptions>, newOptions: TutimOptions): TutimOptions => {
  const newForms = { ...options.forms, ...newOptions.forms };
  return { ...options, forms: newForms };
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
  fieldComponents = {},
  options = optionsContext.options,
  children,
}: FormProviderProps): JSX.Element => {
  const [stateOptions, setStateOptions] = React.useState(options);
  const setOptions = (newOptions: TutimOptions) => setStateOptions(mergeTutimOptions(stateOptions, newOptions));
  const configContextValue = { options: { ...optionsContext.options, ...stateOptions }, setOptions };
  useRemoteSchemas(configContextValue);

  return (
    <FieldComponentsContext.Provider value={fieldComponents}>
      <TutimOptionsContext.Provider value={configContextValue}>{children}</TutimOptionsContext.Provider>
    </FieldComponentsContext.Provider>
  );
};
