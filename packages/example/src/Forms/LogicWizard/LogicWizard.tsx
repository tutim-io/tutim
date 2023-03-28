import React from 'react';
import { FormConfig, Operators } from '@tutim/types';
import { TutimWizard } from '@tutim/fields';

const config: FormConfig = {
  logic: {
    fieldsLogic: {
      lastName: {
        displayIf: {
          field: 'firstName',
          operator: Operators.EQUAL,
          value: 'display',
        },
      },
      'meta.description': {
        displayIf: {
          field: 'meta.title',
          operator: 'equal',
          value: 'display',
        },
      },
      'nested-meta.nested.description': {
        displayIf: {
          field: 'nested-meta.nested.title',
          operator: 'equal',
          value: 'display',
        },
      },
    },
    arrayFieldsLogic: {
      kids: {
        age: {
          displayIf: {
            field: 'firstName',
            operator: Operators.EQUAL,
            value: 'display',
          },
        },
        job: {
          displayIf: {
            field: '$.name',
            operator: Operators.EQUAL,
            value: 'display',
          },
        },
      },
    },
  },
  fields: [
    {
      key: 'nested-meta',
      label: 'Meta',
      type: 'object',
      children: {
        fields: [
          {
            key: 'nested',
            label: 'Nested Meta',
            type: 'object',
            children: {
              fields: [
                {
                  key: 'title',
                  label: 'Form Title',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'description',
                  label: 'Form Description',
                  type: 'text',
                },
              ],
            },
          },
        ],
      },
    },
    {
      key: 'meta',
      label: 'Form Meta',
      type: 'object',
      children: {
        fields: [
          {
            key: 'title',
            label: 'Form Title',
            type: 'text',
            isRequired: true,
          },
          {
            key: 'description',
            label: 'Form Description',
            type: 'text',
          },
        ],
      },
    },
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'text',
    },
    {
      key: 'kids',
      label: 'Kids',
      type: 'array',
      children: {
        fields: [
          {
            key: 'name',
            label: 'Name',
            type: 'text',
          },
          {
            key: 'job',
            label: 'Job',
            type: 'text',
          },
          {
            key: 'age',
            label: 'Age',
            type: 'number',
          },
        ],
      },
    },
  ],
};

export const LogicWizard = (): JSX.Element => {
  return <TutimWizard onSubmit={console.log} config={config} />;
};
