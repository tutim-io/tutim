import { useWizard } from 'react-use-wizard';
import { OnSubmit } from '@tutim/types';
import { useForm } from '@tutim/headless';
import { FormView } from '../Form';

const getStepConfig = (config, step) => {
  const { meta } = config;
  const { steps } = meta;
  const stepConfig = steps[step];
  const fields = stepConfig.elements.map((key) => config.fields.find((field) => field.key === key)).filter(Boolean);
  return fields;
};

const layout = { submit: { display: false } };

export const FormStep = ({ handleSubmit, config }) => {
  const { nextStep, activeStep, isLastStep } = useWizard();
  const stepKey = `page${activeStep}`;
  const fields = getStepConfig(config, stepKey);
  const onSubmit: OnSubmit = ({ data }) => {
    handleSubmit(data, isLastStep);
    nextStep();
  };
  const form = useForm({ fields, layout });
  return <FormView formId={stepKey} form={form} onSubmit={onSubmit} />;
};
