# 🍓 README
<div align="center">
  <a href="https://tutim.io/developers" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/29614540/235614391-38e44c1f-047f-4a7f-aa32-c914fbc1725b.png">
    <img src="https://user-images.githubusercontent.com/29614540/235613969-cb3aeb2b-ba4a-4468-a2af-81c036eb66cf.png" width="320" alt="Logo"/>
  </picture>


  <p align="center">
    <h3>The headless infrastructure for wizard forms</h3>
    <br />
    <a href="https://tutim.io"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://tutim.io">Website</a>
    ·
    <a href="https://discord.tutim.io">Discord</a>
    ·
    <a href="https://app.tutim.io">Cloud (app)</a>
    ·
    <a href="https://codesandbox.io/s/tutim-example-config-custom-field-vo64ym?file=/src/App.tsx">Sandbox Example</a>
  </p>
</p>

[![MIT License](https://img.shields.io/github/license/tutim-io/tutim)](https://github.com/tutim-io/tutim/blob/main/LICENSE) [![Number of GitHub stars](https://img.shields.io/github/stars/tutim-io/tutim?logo=github)](https://github.com/tutim-io/tutim/stargazers) [![Discord is Live](https://img.shields.io/badge/Discord-Live-green?logo=discord&logoColor=%23fff)](https://discord.tutim.io) [![Docs are updated](https://img.shields.io/badge/docs-updated-green?color=blue)](https://docs.tutim.io) [![Product Hunt](https://img.shields.io/badge/Product%20Hunt-Launch%20soon-orange?logo=producthunt&logoColor=%23fff)](https://www.producthunt.com/@leetwito)
 
 
[![Demo](https://res.cloudinary.com/tutim/image/upload/v1682951365/code_demo_2_s0jsjh.gif)](https://www.tutim.io/developers)

  
</div>

---

### 🍓 Open source & headless alternative to TypeForm

Build beautiful and complex forms effortlessly.

Tutim gives you your own in-house multi-step form builder that's fully integrated with your component library and design system. Everybody on your team can create, edit, and publish wizards and surveys in your app regardless of their technical background.

This repo is 100% free, and will always remain.

### ✨ Features

- 🌈 **Headless:** Default design system that can be replaced with yours
- 💌 **API first:** Build, manage and serve forms with our API
- 💅 **Rich form:** Multi-step, conditional branching, validations, and more are available out-of-the-box
- 🚀 **Performant:** Best practices are implemented. Never worry about delays
- 🛠️ **No-Code Builder:** Let PMs and designers create and change in-app wizards. Stick with React for styling and embedding
- 👨‍💻 **Built-in Analytics:** Opening rate, drop-offs, conversions. privacy-first `(coming soon)`
- 📦 **Templates:** Onboarding, personal details, feedback and more

---

## 🚀 Getting Started

[**Explore the docs »**](https://docs.tutim.io)

[**Admin Portal & Builder »**](https://app.tutim.io/)

Create your first wizard in 2 minutes with Tutim default components

<a href="https://tutim.io/developers" target="_blank">
<img src="https://res.cloudinary.com/tutim/image/upload/v1682950119/output_xmopce.png" width="640" alt="Output example"/>
</a>

### 1\. Install tutim React package:

```bash
yarn add @tutim/headless @tutim/fields @tutim/types
```

```bash
npm install @tutim/headless @tutim/fields @tutim/types
```

### 2\. Render the wizard:

```jsx
import { defaultFields } from '@tutim/fields';
import { TutimWizard, TutimProvider } from '@tutim/headless';

const config = {
  // Use https://app.tutim.io to create and manage rich schemas with no-code
  fields: [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'text' },
  ],
};

const App = () => {
  return (
    <div className="App">
      <TutimProvider fieldComponents={defaultFields}>
        <TutimWizard onSubmit={console.log} config={config} />
      </TutimProvider>
    </div>
  );
};

export default App;
```

### 3\. Output Example:

<a href="https://tutim.io/developers" target="_blank">
<img src="https://res.cloudinary.com/tutim/image/upload/v1682950119/output_xmopce.png" width="320" alt="Output example"/>
</a>

### 4\. Customize schema
Build your form schema with [Tutim Form Builder](https://app.tutim.io/) or follow [Form Config Docs](https://docs.tutim.io/api-reference/form-config)

### 5\. Customize components
#### [CustomField](https://docs.tutim.io/react-sdk/customfield)

BYOF - Bring Your Own Field. Use `Field` type to register any type of field. Can be used on `TutimProvider` level for global inputs or withing `FieldConfig` for local use cases

`CustomField` is a component that allows you to define custom form fields that can be used in your react application. You can use it to render any type of form field that you want, based on the `type` specified in the field configuration.

`CustomField` can be used either globally, by specifying it in the `fieldComponents` object passed to the `TutimProvider` component, or locally, by specifying the `Field` prop in the field configuration when creating a form.

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

#### [TutimProvider](https://docs.tutim.io/react-sdk/formprovider)

`TutimProvider` is a component that allows you to define the form fields that you want to use in your react application. It provides a way to specify the field components that will be used to render the form fields, and allows you to use either the default field components provided by the `@tutim/fields` library, or your own custom field components.

```tsx
import { TutimWizard, TutimProvider } from '@tutim/headless';
import { defaultFields } from '@tutim/fields';
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
      <TutimProvider fieldComponents={fieldComponents}>
        <TutimWizard onSubmit={console.log} config={{ fields: [{ key: 'field1' }] }} />
      </TutimProvider>
    </div>
  );
};

export default App;
```

### 📜 Wizards

Tutim provides all forms features, through code or drag & drop interface.

**💌 Inputs**

- [x] All basic (Text, Select, Checkbox, Date...)
- [x] Array & Multi fields
- [x] Object and deep object support
- [ ] Rich input library (coming soon)

**📞 Design & Layout**

- [x] Simple form layout (one pager)
- [x] Layout and grouping control
- [x] Wizard multi steps
- [ ] DnD builder

**😊 Portal**

- [x] Generative builder (build wizard from text with AI)
- [x] Simple form builder
- [x] Conditional branching
- [ ] Templates library

**☁️ Cloud (**[**closed beta, request early access**](https://discord.tutim.io)**)**

- [x] Manage and serve schemas
- [x] Hosted forms
- [x] Backend support
- [ ] 3rd Party integrations

### 🤵 Need Help?

We are more than happy to help you.

If you are getting any errors, facing problems, or need a new feature while working on this project -

Join our [Discord server](https://discord.tutim.io) and ask for help, or [Open an issue](https://github.com/tutim-io/tutim/issues/new/choose)

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

Powered by [tutim.io](https://tutim.io)

