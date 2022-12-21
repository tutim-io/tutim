import { Form } from '@tutim/fields';
import { FormConfig } from '@tutim/types';

const config: FormConfig = {
  layout: {
    submitLabel: 'Next',
    groupConfigs: {
      layout: {
        address: { fieldsPerRow: 2 },
      },
    },
    arrayConfigs: {
      kids2: {
        groupConfigs: {
          layout: {
            kidAddress: { fieldsPerRow: 2 },
          },
        },
      },
      kids: {
        groupConfigs: {
          groups: [
            { key: 'name', title: 'Name', fieldKeys: ['firstName', 'lastName', 'favColor'] },
            { key: 'kidAddress', title: 'Address', fieldKeys: ['kidAddress.kcountry', 'kidAddress.kcity'] },
          ],
          layout: {
            address: { fieldsPerRow: 2 },
            name: { fieldsPerRow: 2 },
            ['kidAddress']: { fieldsPerRow: 2 },
          },
        },
      },
    },
  },
  fields: [
    {
      key: 'app',
      label: 'Application',
      inputType: 'text',
      defaultValue: 'admin',
    },
    {
      key: 'hobbies',
      label: 'Hobbies',
      inputType: 'multi-text',
      isRequired: true,
      logic: {
        displayIf: { field: 'app', operator: 'equal', value: 'admin' },
      },
    },
    {
      key: 'kids',
      label: 'Kids',
      inputType: 'array',
      children: {
        fields: [
          {
            key: 'firstName',
            label: 'First Name',
            inputType: 'text',
            defaultValue: 'name',
            isRequired: true,
          },
          {
            key: 'lastName',
            label: 'Last Name',
            inputType: 'text',
            logic: {
              displayIf: { field: '$.firstName', operator: 'equal', value: 'nameo' },
            },
          },
          {
            key: 'favColor',
            label: 'Favourite Color',
            inputType: 'text',
            logic: {
              displayIf: { field: 'app', operator: 'equal', value: 'admin' },
            },
          },
          {
            key: 'kidAddress',
            label: 'Kid Address',
            inputType: 'nested',
            children: {
              fields: [
                {
                  key: 'kcountry',
                  label: 'kCountry',
                  inputType: 'text',
                  defaultValue: 'Germany',
                  isRequired: true,
                },
                {
                  key: 'kcity',
                  label: 'kCity',
                  inputType: 'text',
                },
              ],
            },
          },
        ],
      },
    },
    {
      key: 'address',
      label: 'Address',
      inputType: 'nested',
      children: {
        fields: [
          {
            key: 'country',
            label: 'Country',
            inputType: 'text',
            defaultValue: 'Germany',
            isRequired: true,
          },
          {
            key: 'city',
            label: 'City',
            inputType: 'text',
            logic: {
              displayIf: { field: 'address.country', operator: 'equal', value: 'israel' },
            },
          },
        ],
      },
    },
  ],
};

export const MultiNested = (): JSX.Element => {
  const onSubmit = (data: any) => alert(JSON.stringify(data));
  return <Form onSubmit={onSubmit} config={config} />;
};
