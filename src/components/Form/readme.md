<h1>Form</h1>

The Form is used to dynamically generate and manage any HTML form.

<h3>Props</h3>

| Property   | Type           | Required |  Description       |
| ---------- | -------------- | -------- | ------------------ |
| data       | object         | false    | Form data          |
| parser     | function       | false    | The function is raised after parse JSON by default before call render |
| schema     | array, object  | false    | JSON configuration. For details see Layout. |
| disabled   | boolean        | false    | Disable form |
| className  | string         | false    | Additional CSS class |
| validate   | async function | false    | Form validator |
| submit     | async function | false    | Raised when the user calls submit and the form is valid. For instance, you are able to save data remotely. Also, you are able to throw errors. |
| onChange   | fucntion       | false    | Raised the user changes some value into field |
| onBlur     | fucntion       | false    | Raised when field lost focus |
| onValidate | function       | false    | Raised when data has been validated |

<h3>Example</h3>

```javascript
import { Component } from 'react';
import { Form } from 'ontime-layout';

const source = [
  {
    component: 'Row',
    children: [
      {
        component: 'Input',
        props: {
          name: 'name',
          label: 'User name',
          leftIcon: 'user'
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
          label: 'Save',
          primary: true
        }
      }
    ]
  }
];

class Test extends Component {

  render() {
    return (
      <Form 
        data={ {name: 'John Snow'} } 
        schema={ source }
        validate={ async (data) => {
          if (!data.name) {
            throw {
              name: [new Error('The name must be required')]
            }
          }
        } }
        submit={ async (data) => {
          // For instance, you chould send data to server
        } }
      />
    );
  }

}
```