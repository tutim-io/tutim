import { FormView } from '@tutim/fields';
import { useForm } from '@tutim/headless';
import { OnSubmit } from '@tutim/types';
import React from 'react';

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
          label: 'Object Fields',
          type: 'object',
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
          label: 'Object Array',
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
                type: 'object',
                children: {
                  fields: [
                    {
                      key: 'minLength',
                      label: 'Min Length',
                      type: 'object',
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
                      type: 'object',
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
                      type: 'object',
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

const config = { fields };
const onSubmit: OnSubmit = ({ data }) => alert(JSON.stringify(data));
const baseStateConfig = {
  key: 'name',
  label: 'Name',
  defaultValue: 'nana',
  type: 'text',
  isRequired: true,
};

export const ControlledForm = (): JSX.Element => {
  const [stateConfig, setStateConfig] = React.useState(config);
  const form = useForm(stateConfig, { resetOptions: { keepValues: true } });
  if (form.error) return <p>Error in form</p>;

  const { reset, getValues, schema } = form;
  const changeState = () => {
    setStateConfig({
      fields: [...config.fields, { ...baseStateConfig, label: `Name random ${Math.random()}` }],
    } as any);
  };
  return (
    <div>
      <div style={{ height: '20px', marginBottom: '20px', display: 'flex', gap: '16px' }}>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => console.log(getValues())}>Get Values</button>
        <button onClick={() => console.log(schema)}>Get Schema</button>
        <button onClick={changeState}>Change State</button>
      </div>
      <FormView onSubmit={onSubmit} form={form} />
    </div>
  );
};
