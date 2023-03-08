import { useWizard } from 'react-use-wizard';
import { FieldConfig, FormConfig, OnSubmit } from '@tutim/types';
import { useForm } from '@tutim/headless';
import { FormView } from '../Form';
import React from 'react';
import { Footer } from './Footer';
import { Box } from '@mui/system';

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

const getStepValues = (config: FormConfig, step: number, values: Record<string, any>): Record<string, any> => {
  const fields = getStepConfig(config, step);
  const stepValues = fields.reduce((acc, field) => {
    const { key } = field;
    const value = values[key];
    return { ...acc, [key]: value };
  }, {});
  return stepValues;
};

const layout = { submit: { display: false } };

export const WizardStep = ({ handleSubmit, config, wizardValues }) => {
  const { nextStep, activeStep, isLastStep } = useWizard();
  const stepKey = `page${activeStep}`;
  const fields = getStepConfig(config, activeStep);
  const onSubmit: OnSubmit = ({ data }) => {
    handleSubmit(data, isLastStep);
    nextStep();
  };
  const initialValues = getStepValues(config, activeStep, wizardValues);
  const form = useForm({ fields, layout });
  const isInitializing = form.useFormInit(async () => initialValues);

  const saveCurrentValues = () => {
    const values = form.getValues();
    handleSubmit(values, false);
  };
  React.useEffect(() => {
    return saveCurrentValues;
  }, []);

  if (!isInitializing) return <div>Loading</div>;
  return (
    <Box style={{ padding: '0px 10px', width: 'calc(100% - 24px)' }}>
      <FormView formId={stepKey} form={form} onSubmit={onSubmit} />
      <Footer />
    </Box>
  );
};
