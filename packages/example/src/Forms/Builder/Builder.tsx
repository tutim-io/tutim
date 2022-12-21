import { Form } from '@tutim/fields';
import config from './config.json';

const fields = [
  {
    key: 'test',
    label: 'Test',
    inputType: 'array',
    children: {
      fields: [
        {
          key: 'name',
          label: 'Name',
          defaultValue: 'nana',
          inputType: 'text',
          isRequired: true,
        },
        {
          key: 'nestedFields',
          label: 'Nested Fields',
          inputType: 'nested',
          children: {
            fields: [
              {
                key: 'nestedName',
                label: 'nestedName',
                defaultValue: 'nestedName',
                inputType: 'text',
                isRequired: true,
              },
              {
                key: 'arrayNested',
                label: 'arrayNested',
                inputType: 'array',
                isRequired: true,
                children: {
                  fields: [
                    {
                      key: 'nestedFieldInArrayNested',
                      label: 'NestedKey',
                      defaultValue: 'jaja',
                      inputType: 'text',
                      isRequired: true,
                      validations: { minLength: { value: 5, message: 'Min Length is 5 characters.' } },
                    },
                    {
                      key: 'nestedFieldInArrayNestedHidden',
                      label: 'NestedKeyHidden',
                      defaultValue: 'hidden',
                      inputType: 'text',
                      isRequired: true,
                      validations: { minLength: { value: 5, message: 'Min Length is 5 characters.' } },
                      logic: {
                        displayIf: {
                          field: '$.nestedFieldInArrayNested',
                          operator: 'in',
                          value: ['jaja'],
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          key: 'nestedArray',
          label: 'Nested Array',
          inputType: 'array',
          defaultValue: [],
          children: {
            fields: [
              {
                key: 'field1',
                label: 'NestedKey',
                defaultValue: 'jaja',
                inputType: 'text',
                isRequired: true,
              },
              {
                key: 'validations',
                label: 'Validations',
                inputType: 'nested',
                children: {
                  fields: [
                    {
                      key: 'minLength',
                      label: 'Min Length',
                      inputType: 'nested',
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            inputType: 'number',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            inputType: 'text',
                          },
                        ],
                      },
                    },
                    {
                      key: 'maxLength',
                      label: 'Max Length',
                      inputType: 'nested',
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            inputType: 'number',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            inputType: 'text',
                          },
                        ],
                      },
                    },
                    {
                      key: 'pattern',
                      label: 'Pattern',
                      inputType: 'nested',
                      isRequired: true,
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            inputType: 'text',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            inputType: 'text',
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                key: 'children',
                label: 'Children',
                inputType: 'text',
                children: {
                  fields: [
                    {
                      key: 'test',
                      label: 'Test',
                      inputType: 'array',
                      children: {
                        fields: [
                          {
                            key: 'name',
                            label: 'Name',
                            defaultValue: 'nana',
                            inputType: 'text',
                            isRequired: true,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
];

const config2 = { fields };
const onSubmit = (data: any) => alert(JSON.stringify(data));

export const Builder = (): JSX.Element => {
  return <Form onSubmit={onSubmit} config={config} />;
};
