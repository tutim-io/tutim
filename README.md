# 🍓 README

[![Tutim.io logo](https://res.cloudinary.com/tutim/image/upload/v1671445328/logo-png_rjs63o.png)](https://tutim.io)

## **Wizard Form infrastructure for product teams**

Headless forms module to create web-app powerful forms in minutes.

[![MIT License](https://img.shields.io/github/license/tutim-io/tutim)](https://github.com/tutim-io/tutim/blob/main/LICENSE) [![Number of GitHub stars](https://img.shields.io/github/stars/tutim-io/tutim?logo=github)](https://github.com/tutim-io/tutim/stargazers) [![Discord is Live](https://img.shields.io/badge/Discord-Live-green?logo=discord&logoColor=%23fff)](https://discord.tutim.io) [![Docs are updated](https://img.shields.io/badge/docs-updated-green?color=blue)](https://docs.tutim.io) [![Product Hunt](https://img.shields.io/badge/Product%20Hunt-Launch%20soon-orange?logo=producthunt&logoColor=%23fff)](https://www.producthunt.com/@leetwito)

---

### 🍓 Why Tutim?

Building forms in apps is complicated.

At first, it seems like just throwing a few input fields, but in reality, it's just the beginning.

Tutim gives you your own in-house form builder that's fully integrated with your component library and design system. Everybody on your team can create, edit, and publish forms and surveys in your app regardless of their technical background.

This repo is 100% free, and will always remain.

### ✨ Features

- 🌈 **Headless:** Default design system that can be replaced with yours
- 💅 **Rich form:** Save draft, wizard, conditional branching, and more are available out-of-the-box
- 🚀 **Performant:** Best practices are implemented. Never worry about delays
- 🛠️ **No-Code Builder:** Let PMs and designers create and change forms. Stick with React for styling and embedding
- 👨‍💻 **Built-in Analytics:** Opening rate, drop-offs, conversions. privacy-first `(coming soon)`
- 📦 **Templates:** Onboarding, personal details, feedback from our gallery`(coming soon)`

---

### 🚀 Getting Started

[**Explore the docs »**](https://docs.tutim.io)

[**Sandbox Example »**](https://codesandbox.io/s/tutim-examples-5ny73h?file=/src/App.tsx)

[**Admin Portal & Builder »**](https://app.tutim.io/)

Create your first form in 2 minutes, by following these steps:

1\. Install tutim React package:

```bash
yarn add @tutim/headless @tutim/fields @tutim/types
```

```bash
npm install @tutim/headless @tutim/fields @tutim/types
```

2\. Create your first form schema with [Tutim Form Builder](https://app.tutim.io/), or by creating the form JSON schema yourself

3\. Render the form:

```jsx
import { TutimWizard, defaultFields } from '@tutim/fields';
import { FormProvider } from '@tutim/headless';

const config = {
  // Use https://tutim.io to create and manage rich schemas with no-code
  fields: [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'text' },
  ],
};

const App = () => {
  return (
    <div className="App">
      <FormProvider fieldComponents={defaultFields}>
        <TutimWizard onSubmit={console.log} config={config} />
      </FormProvider>
    </div>
  );
};

export default App;
```

4\. Output Example:

![Form output example](https://res.cloudinary.com/tutim/image/upload/v1671445339/example-signup-form_zh0af4.png)

#### [CustomField](https://docs.tutim.io/react-sdk/customfield)

BYOF - Bring Your Own Field. Use `Field` type to register any type of field. Can be used on `FormProvider` level for global inputs or withing `FieldConfig` for local use cases

`CustomField` is a component that allows you to define custom form fields that can be used in your react application. You can use it to render any type of form field that you want, based on the `type` specified in the field configuration.

`CustomField` can be used either globally, by specifying it in the `fieldComponents` object passed to the `FormProvider` component, or locally, by specifying the `Field` prop in the field configuration when creating a form.

```tsx
import { Field, FieldConfig } from '@tutim/types';

export const CustomField: Field = ({ inputProps, fieldConfig }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      {fieldConfig.label}: {value}
    </button>
  );
};

export const customFieldConfig: FieldConfig = {
  key: 'clicker',
  label: 'Click Me',
  type: 'custom',
  defaultValue: 0,
  Field: CustomField,
};
```

#### [FormProvider](https://docs.tutim.io/react-sdk/formprovider)

`FormProvider` is a component that allows you to define the form fields that you want to use in your react application. It provides a way to specify the field components that will be used to render the form fields, and allows you to use either the default field components provided by the `@tutim/fields` library, or your own custom field components.

```tsx
import { FormProvider } from '@tutim/headless';
import { defaultFields, TutimWizard } from '@tutim/fields';
import { Field, FieldComponents, InputType } from '@tutim/types';

export const CustomField: Field = ({ inputProps, fieldConfig }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      {fieldConfig.label}: {value}
    </button>
  );
};

const fieldComponents: FieldComponents = {
  ...defaultFields, // optional built in input fields based on MUI
  [InputType.Text]: ({ inputProps }) => <input {...inputProps} />,
  'custom-field': (fieldProps) => <CustomField {...fieldProps} />,
  // add any type of input and reference it by 'type'
};

const App = (): JSX.Element => {
  return (
    <div className="App">
      <FormProvider fieldComponents={fieldComponents}>
        <TutimWizard onSubmit={console.log} config={{ fields: [{ key: 'field1' }] }} />
      </FormProvider>
    </div>
  );
};

export default App;
```

### 📜 Forms

Tutim provides all forms solutions. Through code or drag & drop interface.

**💌 Inputs**

- [x] All basic (Text, Select, Checkbox, Date...)
- [x] Array & Multi fields
- [x] Object and deep object support
- [ ] Rich input library (coming soon)

**📞 Design & Layout**

- [x] Simple form layout (one pager)
- [x] Layout and grouping control
- [x] Wizard multi steps (coming soon)
- [ ] DnD rich builder

**😊 Portal**

- [x] Generative builder (build wizard from text with AI)
- [x] Simple form builder
- [x] Conditional branching
- [ ] Drag & Drop form builder
- [ ] Templates library

**☁️ Cloud (**[**closed beta, request early access**](https://discord.tutim.io)**)**

- [x] Manage and serve schemas
- [x] Hosted forms
- [x] Backend support
- [ ] 3rd Party integrations

### 🤵 Need Help?

We are more than happy to help you.

If you are getting any errors, facing problems, or need a new feature while working on this project -

[Open an issue](https://github.com/tutim-io/tutim/issues/new/choose) or join our [Discord server](https://discord.tutim.io) and ask for help.

### 🔗 Links

- [Home page](https://tutim.io)
- [Admin Portal](https://app.tutim.io)
- [Discord community](https://discord.tutim.io)
- [Twitter](https://twitter.com/Tutim_io)
- [Contribution Guidelines](https://tutim.io/contribute)
- [Docs](https://docs.tutim.io)
- [Support on Product Hunt (follow, we're launching soon!)](https://www.producthunt.com/@leetwito)

### 💪 By the community, for the community

![](https://contrib.rocks/image?repo=tutim-io/tutim)

Powered by [Tutim.io](https://tutim.io)
