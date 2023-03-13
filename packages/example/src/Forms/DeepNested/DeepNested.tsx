import { TutimWizard } from '@tutim/fields';
import { FieldsPerRow } from '@tutim/types';
// import config from './config.json';

const validationsConfig = {
  layout: {
    groupConfigs2: {
      groups: [
        {
          key: 'minLength',
          title: 'Min Length',
          fieldKeys: ['validations.minLength.message', 'validations.minLength.value'],
          layout: { fieldsPerRow: FieldsPerRow.Two },
        },
        {
          key: 'maxLength',
          title: 'Max Length',
          fieldKeys: ['validations.maxLength.message', 'validations.maxLength.value'],
          layout: { fieldsPerRow: FieldsPerRow.Two },
        },
        {
          key: 'pattern',
          title: 'Pattern',
          fieldKeys: ['validations.pattern.message', 'validations.pattern.value'],
          layout: { fieldsPerRow: FieldsPerRow.Two },
        },
      ],
    },
  },
  fields: [
    { key: 'fieldName', label: 'Field name', type: 'text' },
    {
      key: 'validations',
      label: 'Validations',
      type: 'object',
      children: {
        fields: [
          {
            key: 'requiredMessage',
            label: 'Required Message',
            type: 'text',
            isRequired: true,
          },
          {
            key: 'minLength',
            label: 'Min Length',
            type: 'object',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  type: 'text',
                  isRequired: true,
                },
              ],
            },
          },
          {
            key: 'maxLength',
            label: 'Max Length',
            type: 'object',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  type: 'text',
                  isRequired: true,
                },
              ],
            },
          },
          {
            key: 'pattern',
            label: 'Patern',
            type: 'object',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  type: 'text',
                  isRequired: true,
                },
              ],
            },
          },
        ],
      },
    },
    {
      key: 'validationFlat',
      label: 'Validations Flat',
      type: 'array',
      children: {
        fields: [
          {
            key: 'minLength',
            label: 'Min Length',
            type: 'text',
            isRequired: true,
          },
          {
            key: 'minLength3',
            label: 'Min Length3',
            type: 'text',
            isRequired: true,
          },
          {
            key: 'minLength4',
            label: 'Min Length4',
            type: 'text',
            isRequired: true,
          },
        ],
      },
    },
  ],
};

const config = {
  layout: {
    groupConfigs: {
      layout: {
        ['validations.minLength']: { fieldsPerRow: 2 },
        ['validations.maxLength']: { fieldsPerRow: 2 },
        ['validations.pattern']: { fieldsPerRow: 2 },
      },
    },
    groupConfigs2: {
      groups: [
        {
          key: 'validations',
          title: 'Validations',
          fieldKeys: ['validations.minLength.message', 'validations.minLength.value'],
          layout: { fieldsPerRow: FieldsPerRow.Two },
        },
      ],
    },
  },
  fields: validationsConfig.fields,
};

export const DeepNested = (): JSX.Element => {
  const onSubmit = (data: any) => alert(JSON.stringify(data));
  return <TutimWizard onSubmit={onSubmit} config={config} />;
};
