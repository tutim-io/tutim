import React from 'react';
import { FieldsByKey, FormLayout, FormMeta } from '@tutim/types';
import { FormGrid } from './FormGrid';
import { SubmitButton } from '../Buttons';
import { FormTabs } from '../Tabs';
import { getFieldsFromMap } from '@tutim/headless';
import { getGroupFields } from './getGroupFields';
import { Typography } from '@mui/material';

interface FormProps {
  formId?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  fieldsByKey: FieldsByKey;
  layout?: FormLayout;
  meta?: FormMeta;
}

const fieldsLayout = ({ layout = {}, fieldsByKey }: Pick<FormProps, 'layout' | 'fieldsByKey'>): React.ReactNode[] => {
  const fieldsLayout = getFieldsLayout({ layout, fieldsByKey });
  return [...fieldsLayout, <SubmitButton key="submit" {...layout.submit} />];
};

export const getFieldsLayout = ({
  layout = {},
  fieldsByKey,
}: Pick<FormProps, 'layout' | 'fieldsByKey'>): React.ReactNode[] => {
  if (!layout.groupConfigs) return getFieldsFromMap(fieldsByKey);
  return getGroupFields(layout, fieldsByKey);
};

const WizardLayout = ({ layout = {}, fieldsByKey }: Pick<FormProps, 'layout' | 'fieldsByKey'>) => {
  const { groups = [] } = layout.groupConfigs || {};
  const labels = groups.map((group: any) => group.title ?? group.key);
  const groupFields = getGroupFields(layout, fieldsByKey);

  return (
    <FormTabs labels={labels}>
      {groups.map((group: any, ix: number) => {
        return (
          <FormGrid key={group.key}>{[groupFields[ix], <SubmitButton key="submit" {...layout.submit} />]}</FormGrid>
        );
      })}
    </FormTabs>
  );
};

export const FormElement = ({ onSubmit, layout = {}, meta = {}, fieldsByKey, formId }: FormProps) => {
  const title = meta.title && <Typography variant="h5">{meta.title}</Typography>;

  const fields = layout.wizard ? (
    <WizardLayout layout={layout} fieldsByKey={fieldsByKey} />
  ) : (
    <FormGrid>{fieldsLayout({ layout, fieldsByKey })}</FormGrid>
  );

  return (
    <form onSubmit={onSubmit} style={layout.style} noValidate id={formId}>
      {title}
      {fields}
    </form>
  );
};
