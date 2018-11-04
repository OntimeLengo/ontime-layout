<h1>SimpleForm</h1>

The SimpleForm is used to manage any React forms.

<h3>Props</h3>

| Property   | Type           | Required |  Description       |
| ---------- | -------------- | -------- | ------------------ |
| data       | object         | false    | Form data          |
| fetch      | function       | false    | Fetch remove data. The function has to return form data object |
| disabled   | boolean        | false    | Disable form |
| className  | string         | false    | Additional CSS class |
| validate   | async function | false    | Form validator |
| submit     | async function | false    | Raised when the user calls submit and the form is valid. For instance, you are able to save data remotely. Also, you are able to throw errors. |
| onChange   | fucntion       | false    | Raised the user changes some value into field |
| onBlur     | fucntion       | false    | Raised when field lost focus |
| onValidate | function       | false    | Raised when data has been validated |
| children   | any            | false    | children components |

<h3>Example</h3>

<h4>Default data source</h4>

```javascript
import { Component } from 'react';
import { SimpleForm, Row, Input, Button } from 'ontime-layout';

class Test extends Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      data: {login: '', password: ''}
    };
  }

  async submit(data) {
    // For instance, you chould send data to server
  }

  async validate(data) {
    const errors = {};

    if (!data.login) {
      errors.login = [new Error('The login is required')];
    }

    if (!data.password) {
      errors.password = [new Error('The password is required')];
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  }

  render() {
    return (
      <SimpleForm 
        data={ this.state.data } 
        validate={ this.validate }
        submit={ this.submit }
      >
        <Row>
          <Input name="login" required />
          <Input name="password" type="password" required />
          <Button type="submit" label="Log in" />
        </Row>
      </SimpleForm>
    );
  }

}
```

<h4>Remote data source</h4>

```javascript
import { Component } from 'react';
import { SimpleForm, Row, Input, Button } from 'ontime-layout';

class Test extends Component {

  constructor() {
    super();

    this.fetch = this.fetch.bind(this);
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async fetch() {
    // For instance, you are able to send the request to the server and this function has to return the response.
    return {name: 'John Snow', email: 'john.snow@gmail.com'};
  }

  async submit(data) {
    // For instance, you chould send data to server
  }

  async validate(data) {
    const errors = {};

    if (!data.name) {
      errors.name = [new Error('The name is required')];
    }

    if (!data.email) {
      errors.email = [new Error('The email is required')];
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  }

  render() {
    return (
      <SimpleForm 
        fetch={ this.fetch }
        validate={ validate }
        submit={ this.submit }
      >
        <Row>
          <Input name="name" required />
          <Input name="email" type="email" required />
          <Button type="submit" label="Save" />
        </Row>
      </SimpleForm>
    );
  }

}
```
