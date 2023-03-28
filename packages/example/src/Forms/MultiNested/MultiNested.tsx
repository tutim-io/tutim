import { TutimWizard } from '@tutim/fields';
import { FormConfig } from '@tutim/types';

const config: FormConfig = {
  layout: {
    submit: {
      label: 'Next',
    },
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
          groups: [{ key: 'name', title: 'Name', fieldKeys: ['firstName', 'lastName', 'favColor'] }],
          layout: {
            address: { fieldsPerRow: 2 },
            name: { fieldsPerRow: 2 },
            ['kidAddress']: { fieldsPerRow: 2 },
          },
        },
      },
    },
  },
  logic: {
    fieldsLogic: {
      hobbies: {
        displayIf: { field: 'app', operator: 'equal', value: 'admin' },
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
          },
          {
            key: 'favColor',
            label: 'Favourite Color',
            type: 'text',
          },
          {
            key: 'kidAddress',
            label: 'Kid Address',
            type: 'object',
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
      type: 'object',
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
          },
        ],
      },
    },
  ],
};

export const MultiNested = (): JSX.Element => {
  const onSubmit = (data: any) => alert(JSON.stringify(data));
  return <TutimWizard onSubmit={onSubmit} config={config} />;
};
