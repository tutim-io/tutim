
<a href="https://tutim.io"><img src=".gitbook/assets/logo png.png" alt="Tutim.io logo" width="400"></a>

# **Form infrastructure for product teams**

Headless forms module to create web-app powerful forms in minutes.&#x20;

[![MIT License](https://img.shields.io/github/license/tutim-io/tutim)](https://github.com/tutim-io/tutim/blob/main/LICENSE)  [![Number of GitHub stars](https://img.shields.io/github/stars/tutim-io/tutim?logo=github)](https://github.com/tutim-io/tutim/stargazers)  [![Discord is Live](https://img.shields.io/badge/Discord-Live-green?logo=discord\&logoColor=%23fff)](https://discord.tutim.io)  [![Docs are updated](https://img.shields.io/badge/docs-updated-green?color=blue)](https://docs.tutim.io)  [![Product Hunt](https://img.shields.io/badge/Product%20Hunt-Launch%20soon-orange?logo=producthunt\&logoColor=%23fff)](https://www.producthunt.com/@leetwito)

---

## 🍓 Why Tutim?

Building forms in apps is complicated.&#x20;

At first, it seems like just throwing a few input fields, but in reality, it's just the beginning.&#x20;

Tutim gives you your own in-house form builder that's fully integrated with your component library and design system. Everybody on your team can create, edit, and publish forms and surveys in your app regardless of their technical background.

This repo is 100% free, and will always remain. Visit [tutim.io](https://tutim.io) for our pro features.



## ✨ Features

* 🌈 **Headless:** Default design system that can be replaced with yours
* 💅 **Rich form features:** Save draft, wizard, conditional rendering, and more are out-of-the-box and free
* 🚀 **Performant:** Best practices are implemented. Never worry about delays
* 🛠️ **No-Code Builder:** Let PMs and designers create and change forms. Stick with React for styling and embedding
* 👨‍💻 **Built-in Analytics:** Opening rate, drop-offs, conversions. privacy-first `(coming soon)`
* 📦 **Templates:** onboarding, sign-up, KYC from our gallery`(coming soon)`



## 🚀 Getting Started

[**Explore the docs »**](https://docs.tutim.io)

We are excited to launch the complete Tutim API and admin panel.&#x20;

Create your first form in 2 minutes, by following these steps:

&#x20; 1\. Install tutim React package:

```bash
npm install @tutim/react
```

&#x20; 2\. Create your first form schema with [Tutim Form Builder](https://eylonmiz.github.io/tutim-builder/), or by creating the form JSON schema yourself

&#x20; 3\. Render the form:

```jsx
import { tutim } from '@tutim/react';

const myform = new tutim.Form(tutim.loadSchema(JSON_PATH));
```

## ⭐ Example

Play with Tutim and create a form in 2 minutes

![Form output example](.gitbook/assets/outputform\_272px.png)



Compose the JSON yourself or build through [Tutim form builder](https://tutim.io) for free

<pre class="language-json" data-title="form123_schema.JSON" data-overflow="wrap" data-line-numbers><code class="lang-json">{
  "formId": "form_123",
  "fields": [
  {
    "displayName": "Your Email"
    "inputType": "text"
    "key": "email"
    "prefix-icon": "email"
    "placeholder": "name@company.com"
    "validations": ["required", "email"]
    "help": "Enter your work email to get your receipt"
  },
  {
     "displayName": "Favorite Animal"
     "inputType": "radio"
     "key": "favorite_animal"
     "options": [
       {"value": "dog", "label": "Dog"}
       {"value": "cat", "label": "Cat"}
       {"value": "kangaroo", "label": "Kangaroo"}
  },
  {
      "displayName": "I accept the terms"
      "inputType": "checkbox"
      "key": "terms_checkbox"
      "validations": ["required"]
      "validationHelp": "You must agree to the terms to proceed"
<strong>  }
</strong>  ]
}
</code></pre>



Make customizations with React, like using your design system or adding your input field

```jsx
import { tutim } from '@tutim/react';
const myfREACorm = new tutim.Form(tutim.loadSchema("form123_schema.JSON"))

XXX Tailwind XXX
```



## 📜 Forms

Tutim provides all input types also through a drag & drop interface.

**💌 Inputs**

* [x] Text
* [x] Select
* [x] Radio
* [x] Switch
* [x] Checkbox
* [x] JSON
* [x] Multi-text
* [ ] Date picker
* [ ] Dropdown
* [ ] Autocomplete
* [ ] File upload
* [ ] E-signature

**📞 Validations**

* [x] General (required, min/max, email...)
* [x] Hint
* [ ] Custom
* [ ] Regex
* [ ] Backend validation support

**😊 Experience**

* [x] Tailwind CSS
* [ ] Multi-page wizard
* [ ] Conditional branching
* [ ] i18n
* [ ] a11y
* [ ] Nesting

## 🤵 Need Help?

We are more than happy to help you.&#x20;

If you are getting any errors, facing problems, or need a new feature while working on this project, join our [Discord server](https://discord.tutim.io) and ask for help.&#x20;

## 🔗 Links

* [Home page](https://tutim.io)
* [Discord community](https://discord.tutim.io)
* [Twitter](https://twitter.com/Tutim_io)
* [Contribution Guidelines](https://tutim.io/contribute)
* [Docs](https://docs.tutim.io)
* [Support on Product Hunt (follow, we're launching soon!)](https://www.producthunt.com/@leetwito)

## 💪 By the community, for the community


![](https://contrib.rocks/image?repo=tutim-io/tutim)

Powered by [Tutim.io](https://tutim.io)
