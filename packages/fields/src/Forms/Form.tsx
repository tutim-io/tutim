import React from 'react';
import { useForm, useFormConfig } from '@tutim/headless';
import { OnSubmit, PartialFormConfig, UseFormReturn } from '@tutim/types';
import { FormElement } from './FormElement';
import { Button } from '../Buttons';
import { Wizard } from './Wizard';

interface FormProps {
  onSubmit: OnSubmit;
  formId?: string;
  config?: PartialFormConfig;
  initialValues?: Record<string, any>;
}
interface FormViewProps {
  formId?: string;
  form: UseFormReturn;
  onSubmit: OnSubmit;
}

const SuccessfulSubmission = ({ reset }: { reset: () => void }) => {
  const onClick = () => reset();

  return (
    <div>
      <p>Submitted Successfully</p>
      <Button label="Back to form" onClick={onClick} />
    </div>
  );
};

export const FormView = ({ formId, form, onSubmit }: FormViewProps): JSX.Element => {
  const { fieldsByKey, nativeSubmit, formState, reset, layout, meta, logic } = form;
  const { isSubmitSuccessful } = formState;
  const onControlledSubmit = nativeSubmit(onSubmit);

  if (isSubmitSuccessful && logic.submissionPage) return <SuccessfulSubmission reset={reset} />;
  return (
    <FormElement formId={formId} onSubmit={onControlledSubmit} layout={layout} meta={meta} fieldsByKey={fieldsByKey} />
  );
};

/**
 * fully managed TutimForm.
 *
 * @remarks
 * [API](https://docs.tutim.io/) • [Builder](https://tutim.io/)
 *
 * @param props - form configuration and actions.
 *
 * @example
 * ```tsx
 * import { FormProvider } from '@tutim/headless';
 * import { Form, defaultFields } from '@tutim/fields';
 *
 * const config = {
 *   fields: [
 *     { key: 'firstName', label: 'First Name', type: 'text' },
 *     { key: 'lastName', label: 'Last Name', type: 'text' },
 *   ],
 * };
 *
 * export const TutimForm = (): JSX.Element => {
 *   return <Form onSubmit={console.log} config={config} />;
 * };
 *
 * const App = (): JSX.Element => {
 *   return (
 *     <div className="App">
 *       <FormProvider fieldComponents={defaultFields}>
 *         <TutimForm />
 *       </FormProvider>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
export const Form = ({ formId, config, onSubmit, initialValues }: FormProps): JSX.Element => {
  const configOrRemoteConfig = useFormConfig(config || formId || '');
  const isWizard = configOrRemoteConfig.wizard?.steps?.length;

  if (isWizard) return <Wizard onSubmit={onSubmit} config={configOrRemoteConfig} initialValues={initialValues} />;
  return (
    <SinglePageForm onSubmit={onSubmit} formId={formId} config={configOrRemoteConfig} initialValues={initialValues} />
  );
};

interface SinglePageFormProps {
  formId?: string;
  config: PartialFormConfig;
  onSubmit: OnSubmit;
  initialValues?: Record<string, any>;
}

export const SinglePageForm = ({ formId, config, onSubmit, initialValues }: SinglePageFormProps): JSX.Element => {
  const form = useForm(config);
  if (!formId && !config) return <p>Error in loading form</p>;
  if (form.error) return <p>Error in loading form</p>;
  form.useFormInit(async () => initialValues);

  return <FormView formId={formId} form={form} onSubmit={onSubmit} />;
};
