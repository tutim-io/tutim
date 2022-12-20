import React from 'react';
import { FieldsByKey, FormLayout } from '@tutim/types';
import { FormGrid } from './FormGrid';
import { SubmitButton } from '../Buttons';
import { FormTabs } from '../Tabs';
import { getFieldsFromMap } from '@tutim/headless';
import { getGroupFields } from './getGroupFields';

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  fieldsByKey: FieldsByKey;
  layout?: FormLayout;
}

const fieldsLayout = ({ layout = {}, fieldsByKey }: Pick<FormProps, 'layout' | 'fieldsByKey'>): React.ReactNode[] => {
  const fieldsLayout = getFieldsLayout({ layout, fieldsByKey });
  return [
    ...fieldsLayout,
    <div key="submit" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <SubmitButton key="submit" label={layout.submitLabel} />
    </div>,
  ];
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
          <FormGrid key={group.key}>
            {[
              groupFields[ix],
              <div key="submit" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SubmitButton key="submit" label={layout.submitLabel} />
              </div>,
            ]}
          </FormGrid>
        );
      })}
    </FormTabs>
  );
};

export const FormElement = ({ onSubmit, layout = {}, fieldsByKey }: FormProps) => {
  return (
    <form onSubmit={onSubmit} style={layout.style} noValidate>
      {layout.wizard ? (
        <WizardLayout layout={layout} fieldsByKey={fieldsByKey} />
      ) : (
        <FormGrid>{fieldsLayout({ layout, fieldsByKey })}</FormGrid>
      )}
    </form>
  );
};
