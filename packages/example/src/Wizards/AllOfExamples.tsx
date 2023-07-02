import React from 'react';
import { FormConfig, Field } from '@tutim/types';
import { TutimWizard } from '@tutim/headless';

const config: FormConfig = {
    fields: [
        {
            key: 'firstName',
            label: 'TextField',
            type: 'text',
        },
        {
            key: 'lastName',
            label: 'TextField',
            type: 'text',
            isRequired: true,
            tooltip: 'A tooltip',
            helperText: 'A helper text',
            placeholder: 'A placeholder',
            "defaultValue": "no last"
        },
        {
            key: 'dataPicker',
            label: 'DateField',
            type: 'date',
            isRequired: true,
        },
        {
            "key": "agree",
            "label": "Agree to our terms and conditions - CheckBoxField",
            "isDisabled": false,
            "type": "checkbox",
            "isRequired": true
        },
        {
            "key": "settings",
            "label": "JsonField",
            "isDisabled": false,
            "type": "json",
            "isRequired": false
        },
        // {
        //     "key": "role",
        //     "label": "Select",
        //     "isDisabled": false,
        //     "type": "select",
        //     "options": [
        //         { "value": "admin", "label": "Administrator" },
        //         { "value": "viewer", "label": "Viewer", "disabled": true },
        //         { "value": "editor", "label": "Editor" }
        //     ],
        //     "isRequired": false,
        //     "defaultValue": "editor"
        // },
        {
            key: 'kids',
            label: 'FieldArray + Collapse + NumberField + textField',
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
        {
            key: 'nested-meta',
            label: 'Nested Meta Collapse',
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
            label: 'Meta Collapse',
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
    wizard: {
        steps: [
            {
                label: 'Basic',
                fields: ['firstName', 'lastName', 'dataPicker', 'agree', 'settings', 'role', 'clicker', 'kids', 'meta', 'nested-meta'],
            },
            {
                label: 'Contact',
                fields: ['email', 'phone'],
            },
            {
                label: 'Additional',
                fields: ['additional'],
            },
        ],
        orientation: 'vertical',
    },
    meta: {
        title: 'Example Title',
    },
};

const CustomField: Field = ({ inputProps }) => {
    const { value, onChange } = inputProps;
    const onClick = () => onChange(value + 2);
    return (
        <button type="button" onClick={onClick}>
            Click Me: {value}
        </button>
    );
};

const customField = {
    key: 'clicker',
    label: 'Click Me',
    type: 'custom',
    defaultValue: 0,
    Field: CustomField,
};

const newConfig = { ...config, fields: [...config.fields, customField] };

const initialValues = {
    firstName: 'sami',
    agree: true,
    enable: true,
    hosting: 'cloud',
};

export const AllOfExamples = (): JSX.Element => {
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data));
    };

    return <TutimWizard onSubmit={onSubmit} config={newConfig} initialValues={initialValues} />;
};