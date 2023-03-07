import { useWizard } from 'react-use-wizard';
import { FieldConfig, FormConfig, OnSubmit } from '@tutim/types';
import { useForm } from '@tutim/headless';
import { FormView } from '../Form';

const getStepConfig = (config: FormConfig, step: number): FieldConfig[] => {
  const { wizard } = config;
  const { steps } = wizard || {};
  if (!steps) return [];
  const stepConfig = steps[step];
  const fields = stepConfig.fields
    .map((key) => config.fields.find((field) => field.key === key))
    .filter(Boolean) as FieldConfig[];
  return fields;
};

const layout = { submit: { display: false } };

export const WizardStep = ({ handleSubmit, config }) => {
  const { nextStep, activeStep, isLastStep } = useWizard();
  const stepKey = `page${activeStep}`;
  const fields = getStepConfig(config, activeStep);
  const onSubmit: OnSubmit = ({ data }) => {
    handleSubmit(data, isLastStep);
    nextStep();
  };
  const form = useForm({ fields, layout });
  return <FormView formId={stepKey} form={form} onSubmit={onSubmit} />;
};
