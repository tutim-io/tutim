import { Form } from '@tutim/fields';
import config from './config.json';

const fields = [
  {
    key: 'test',
    label: 'Test',
    type: 'array',
    children: {
      fields: [
        {
          key: 'name',
          label: 'Name',
          defaultValue: 'nana',
          type: 'text',
          isRequired: true,
        },
        {
          key: 'nestedFields',
          label: 'Nested Fields',
          type: 'nested',
          children: {
            fields: [
              {
                key: 'nestedName',
                label: 'nestedName',
                defaultValue: 'nestedName',
                type: 'text',
                isRequired: true,
              },
              {
                key: 'arrayNested',
                label: 'arrayNested',
                type: 'array',
                isRequired: true,
                children: {
                  fields: [
                    {
                      key: 'nestedFieldInArrayNested',
                      label: 'NestedKey',
                      defaultValue: 'jaja',
                      type: 'text',
                      isRequired: true,
                      validations: { minLength: { value: 5, message: 'Min Length is 5 characters.' } },
                    },
                    {
                      key: 'nestedFieldInArrayNestedHidden',
                      label: 'NestedKeyHidden',
                      defaultValue: 'hidden',
                      type: 'text',
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
          type: 'array',
          defaultValue: [],
          children: {
            fields: [
              {
                key: 'field1',
                label: 'NestedKey',
                defaultValue: 'jaja',
                type: 'text',
                isRequired: true,
              },
              {
                key: 'validations',
                label: 'Validations',
                type: 'nested',
                children: {
                  fields: [
                    {
                      key: 'minLength',
                      label: 'Min Length',
                      type: 'nested',
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            type: 'number',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            type: 'text',
                          },
                        ],
                      },
                    },
                    {
                      key: 'maxLength',
                      label: 'Max Length',
                      type: 'nested',
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            type: 'number',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            type: 'text',
                          },
                        ],
                      },
                    },
                    {
                      key: 'pattern',
                      label: 'Pattern',
                      type: 'nested',
                      isRequired: true,
                      children: {
                        fields: [
                          {
                            key: 'value',
                            label: 'Value',
                            type: 'text',
                          },
                          {
                            key: 'message',
                            label: 'Message',
                            type: 'text',
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
                type: 'text',
                children: {
                  fields: [
                    {
                      key: 'test',
                      label: 'Test',
                      type: 'array',
                      children: {
                        fields: [
                          {
                            key: 'name',
                            label: 'Name',
                            defaultValue: 'nana',
                            type: 'text',
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
