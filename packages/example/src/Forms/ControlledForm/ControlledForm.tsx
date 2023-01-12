import { FormView } from '@tutim/fields';
import { useForm } from '@tutim/headless';
import { OnSubmit } from '@tutim/types';
import React from 'react';

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

const config = { fields };
const onSubmit: OnSubmit = ({ data }) => alert(JSON.stringify(data));
const baseStateConfig = {
  key: 'name',
  label: 'Name',
  defaultValue: 'nana',
  inputType: 'text',
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
