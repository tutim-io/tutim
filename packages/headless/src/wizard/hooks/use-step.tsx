import { FieldConfig, FormConfig } from '@tutim/types';
import { useForm } from '@tutim/headless';
import React from 'react';
import { useWizardContext } from './use-wizard';

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

// export const WizardStep = ({ handleSubmit, config }) => {
//   const { activeStep } = useWizard();
//   const wizardState = useWizardState();
//   const stepKey = `page${activeStep}`;
//   const fields = getStepConfig(config, activeStep);
//   const onSubmit: OnSubmit = ({ data }) => {
//     handleSubmit(data, false);
//   };
//   const onFinalSubmit: OnSubmit = ({ data }) => {
//     handleSubmit(data, true);
//   };
//   const initialValues = getStepValues(config, activeStep, wizardState.wizardValues);
//   const form = useForm({
//     ...config,
//     fields,
//     layout: { ...config.layout, ...layout },
//     meta: { ...config.meta, ...meta },
//   });
//   React.useEffect(() => {
//     wizardState.setCurrentForm(form);
//   }, []);
//   const isInitializing = form.useFormInit(async () => initialValues);

//   const submit = form.nativeSubmit(onSubmit);

//   React.useEffect(() => {
//     return submit;
//   }, []);

//   if (!isInitializing) return <div>Loading</div>;
//   return (
//     <WizardCurrentFormContext.Provider value={form}>
//       <Box style={{ padding: '0px 10px', width: 'calc(100% - 24px)' }}>
//         <FormView formId={stepKey} form={form} onSubmit={onSubmit} />
//         <Footer onFinalSubmit={form.nativeSubmit(onFinalSubmit)} />
//       </Box>
//     </WizardCurrentFormContext.Provider>
//   );
// };

export const useStep = () => {
  const { config, currentStep, wizardValues, setCurrentForm, goToStep } = useWizardContext();

  const fields = getStepConfig(config, currentStep);
  const initialValues = getStepValues(config, currentStep, wizardValues);
  console.log('🚀 ~ file: use-step.tsx:75 ~ useStep ~ initialValues:', initialValues);
  const stepConfig = {
    ...config,
    fields,
    layout: { ...config.layout, ...layout },
    meta: { ...config.meta, ...meta },
  };

  const form = useForm(stepConfig);

  React.useEffect(() => {
    setCurrentForm(form);
    Object.entries(initialValues).forEach(([key, value]) => form.setValue(key, value));
  }, [currentStep]);

  return {
    form,
    goBack: () => goToStep(currentStep - 1),
    goNext: () => goToStep(currentStep + 1),
  };
};
