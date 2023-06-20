import React from 'react';
import { WizardProps, WrapperType } from '@tutim/types';
import { useFieldComponents } from '../../context';
import { useFormConfig } from '../../form';

/**
 * fully managed TutimWizard.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - form configuration and actions.
 *
 * @example
 * ```tsx
 * import { TutimProvider } from '@tutim/headless';
 * import { TutimWizard, defaultFields } from '@tutim/fields';
 *
 * const config = {
 *   fields: [
 *     { key: 'firstName', label: 'First Name', type: 'text' },
 *     { key: 'lastName', label: 'Last Name', type: 'text' },
 *   ],
 * };
 *
 * const App = (): JSX.Element => {
 *   return (
 *     <div className="App">
 *       <TutimProvider fieldComponents={defaultFields}>
 *         <TutimWizard onSubmit={console.log} config={config} />
 *       </TutimProvider>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */

export const TutimWizard = ({ formId, config, onSubmit, initialValues, wizardContext }: WizardProps): JSX.Element => {
  const configOrRemoteConfig = useFormConfig(config || formId || '');
  const isWizard = configOrRemoteConfig.wizard?.steps?.length;

  if (!configOrRemoteConfig.fields.length) return <p>No Fields</p>;
  const fieldComponents = useFieldComponents();

  const Wrapper: any = isWizard
    ? fieldComponents[WrapperType.MultiStepWizard]
    : fieldComponents[WrapperType.SingleStepForm];

  // if (wizardContext)
  //   return <ControlledWizard onSubmit={onSubmit} config={configOrRemoteConfig} wizardContext={wizardContext} />;

  if (isWizard) return <Wrapper onSubmit={onSubmit} config={configOrRemoteConfig} initialValues={initialValues} />;
  return <Wrapper onSubmit={onSubmit} formId={formId} config={configOrRemoteConfig} initialValues={initialValues} />;
};
