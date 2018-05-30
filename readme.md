<h1>ontime-layout</h1>

The library is used to create any layouts or forms from JSON configuration.

<h2>Install</h2>

```
// npm
npm install ontime-layout

// yarn
yarn add ontime-layout
```

<h2>Many examples</h2>

Please see the storybook page where you are able to see and test all components with documentation and examples.

[ontime-layout/storybook](https://ontimelengo.github.io/ontime-layout/)

<h2>Credits</h2>

ontime-layout is library to create and manage UI for React 16.

<h2>Usage</h2>

<strong>Register components, functions etc for using</strong>

You  are able to register only - component, function, class, object, exec

* component - React component
* function - any function
* class - any class
* object - any object
* exec - any function which will we called after parse

```javascript
import { Row, Input, Button } from 'ontime-components';
import { config } from 'ontime-layout';
import i18n from 'i18n';

config.set('component', 'Row', Row);
config.set('component', 'Input', Input);
config.set('component', 'Button', Button);

config.set('function', 'populateSelect', async () => ['John Snow', 'Rob Stark']);
config.set('exec', 'translate', (key, options) => i18n.t(key, options));
```

<strong>Register translating function for validator</strong>

If you want to use ontime-layout validator and see correct errors. You shloud register translating function. Please see below example how to do.

```javascript
import { config } from 'ontime-layout';
import i18n from 'i18n';

config.setI18n((key, options) => i18n.t(key, options));
```

<strong>How to use registered components, function etc in JSON configuration</strong>

```javascript
import { Layout } from 'ontime-layout';

const data = [
  {
    component: 'Row',
    children: [
      {
        component: 'Input',
        props: {
          name: 'name',
          label: ['exec/translate', 'user.name'],
          leftIcon: 'user'
        }
      },
      {
        component: 'Select',
        props: {
          name: 'region',
          label: ['exec/translate', 'user.alias'],
          dataSource: 'function/populateSelect'
        }
      }
    ]
  },
  {
    component: 'Row',
    children: [
      {
        component: 'Button',
        props: {
          type: 'submit',
          label: ['exec/translate', 'save'],
          primary: true
        }
      },
      {
        component: 'Button',
        props: {
          label: ['exec/translate', 'cancel']
        }
      }
    ]
  }
];

<Layout data={ data } />
```

<strong>For From details please see [ontime-layout/storybook/form](https://ontimelengo.github.io/ontime-layout/index.html?selectedKind=Form&selectedStory=default)</strong>

<strong>For Layout details please see [ontime-layout/storybook/layout](https://ontimelengo.github.io/ontime-layout/index.html?selectedKind=Layout&selectedStory=default)</strong>

<strong>How to use validator</strong>

```javascript
import { validator } from 'ontime-layout';

// Create rules
const rules = {
  name: {
    req: true,
    maxLen: 100
  },
  email: {
    req: true,
    email: true
  }
};

// Create data
const data = {
  name: '',
  email: '111'
};

// create validate function for rules
const validate = validator(rules);

// validate
try {
  await validate(data);
} catch (err) {
  console.error(err);
}

// if need to validate only one field
try {
  await validate(data, 'email');
} catch (err) {
  console.error(err);
}

// Use validate into Form
<Form 
  data={ data }
  validate={ validate }
/>
```

<strong>List of predefined rules</strong>

* req - Value must be required
* email - Check email
* url - Check URL
* max - Value must be less then
* min - Value must be more then
* maxLen - Value length must be less then
* minLen - Value length must be more then
* confirm - Value and another value must be the same
* regExp - Check value by regular expression
* gt - Value must be greater or equal
* ge - Value must be greater
* lt - Value must be less or equal
* le - Value must be less
* list - Minimum one value must be selected
* listSelect - Minimum one value must be selected
* alphabet - You can only enter letters and numbers
* all - An invalid character

<h2>License</h2>

MIT
