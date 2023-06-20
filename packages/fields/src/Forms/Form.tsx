import React from 'react';
import { useForm } from '@tutim/headless';
import { OnSubmit, PartialFormConfig, UseFormReturn } from '@tutim/types';
import { FormElement } from './FormElement';
import { Button } from '../Buttons';

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
