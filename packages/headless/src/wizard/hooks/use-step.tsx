import { FieldConfig, FormConfig } from '@tutim/types';
import React from 'react';
import { useWizardContext } from './use-wizard';
import { useForm } from '../../form';

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
const meta = { title: undefined };

export const useStep = () => {
  const { config, activeStep, wizardValues, goToStep, onStepSubmit } = useWizardContext();

  const fields = getStepConfig(config, activeStep);
  const initialValues = getStepValues(config, activeStep, wizardValues);
  const stepConfig = {
    ...config,
    fields,
    layout: { ...config.layout, ...layout },
    meta: { ...config.meta, ...meta },
  };

  const form = useForm(stepConfig);

  React.useEffect(() => {
    form.reset(initialValues);
  }, [activeStep]);

  const isLastStep = activeStep + 1 === config?.wizard?.steps.length;
  const isFirstStep = activeStep === 0;
  const goBack = () => {
    if (form.formState.isValid) {
      onStepSubmit(form.getValues(), false);
    }
    goToStep(activeStep - 1);
  };
  const goNext = () => {
    if (form.formState.isValid) {
      onStepSubmit(form.getValues(), isLastStep);
    }
    goToStep(activeStep + 1);
  };

  return { form, goBack, goNext, isLastStep, isFirstStep };
};
