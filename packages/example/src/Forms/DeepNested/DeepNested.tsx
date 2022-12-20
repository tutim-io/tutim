import { Form } from '@tutim/fields';
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
    { key: 'fieldName', label: 'Field name', inputType: 'text' },
    {
      key: 'validations',
      label: 'Validations',
      inputType: 'nested',
      children: {
        fields: [
          {
            key: 'requiredMessage',
            label: 'Required Message',
            inputType: 'text',
            isRequired: true,
          },
          {
            key: 'minLength',
            label: 'Min Length',
            inputType: 'nested',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  inputType: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  inputType: 'text',
                  isRequired: true,
                },
              ],
            },
          },
          {
            key: 'maxLength',
            label: 'Max Length',
            inputType: 'nested',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  inputType: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  inputType: 'text',
                  isRequired: true,
                },
              ],
            },
          },
          {
            key: 'pattern',
            label: 'Patern',
            inputType: 'nested',
            isRequired: true,
            children: {
              fields: [
                {
                  key: 'value',
                  label: 'Value',
                  inputType: 'text',
                  isRequired: true,
                },
                {
                  key: 'message',
                  label: 'Message',
                  inputType: 'text',
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
      inputType: 'nested',
      multi: {},
      children: {
        fields: [
          {
            key: 'minLength',
            label: 'Min Length',
            inputType: 'text',
            isRequired: true,
          },
          {
            key: 'minLength3',
            label: 'Min Length3',
            inputType: 'text',
            isRequired: true,
          },
          {
            key: 'minLength4',
            label: 'Min Length4',
            inputType: 'text',
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
  return <Form onSubmit={onSubmit} config={config} />;
};
