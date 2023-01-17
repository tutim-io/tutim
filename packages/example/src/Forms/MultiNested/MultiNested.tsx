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
      type: 'text',
      defaultValue: 'admin',
    },
    {
      key: 'hobbies',
      label: 'Hobbies',
      type: 'multi-text',
      isRequired: true,
      logic: {
        displayIf: { field: 'app', operator: 'equal', value: 'admin' },
      },
    },
    {
      key: 'kids',
      label: 'Kids',
      type: 'array',
      children: {
        fields: [
          {
            key: 'firstName',
            label: 'First Name',
            type: 'text',
            defaultValue: 'name',
            isRequired: true,
          },
          {
            key: 'lastName',
            label: 'Last Name',
            type: 'text',
            logic: {
              displayIf: { field: '$.firstName', operator: 'equal', value: 'nameo' },
            },
          },
          {
            key: 'favColor',
            label: 'Favourite Color',
            type: 'text',
            logic: {
              displayIf: { field: 'app', operator: 'equal', value: 'admin' },
            },
          },
          {
            key: 'kidAddress',
            label: 'Kid Address',
            type: 'nested',
            children: {
              fields: [
                {
                  key: 'kcountry',
                  label: 'kCountry',
                  type: 'text',
                  defaultValue: 'Germany',
                  isRequired: true,
                },
                {
                  key: 'kcity',
                  label: 'kCity',
                  type: 'text',
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
      type: 'nested',
      children: {
        fields: [
          {
            key: 'country',
            label: 'Country',
            type: 'text',
            defaultValue: 'Germany',
            isRequired: true,
          },
          {
            key: 'city',
            label: 'City',
            type: 'text',
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
