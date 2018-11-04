import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withReadme } from 'storybook-readme';

import '../node_modules/ontime-components/dist/main.css';
import '../dist/main.css';
import { Container, Row, Input, Button } from 'ontime-components';

import { config, SimpleForm } from '../src';

import Readme from '../src/components/SimpleForm/readme.md';

const confTranslate = {
  "validator.req": "This field is required",
  "validator.email": "The value is not a valid email",
  "validator.url": "URL is not valid",
  "validator.max": "The value of more than {{ max }}",
  "validator.min": "The value less than {{ min }}",
  "validator.maxLen": "The value is longer than {{ max }} characters",
  "validator.minLen": "The value is less than {{ min }} characters",
  "validator.confirm": "Values do not match",
  "validator.regExp": "The expression is not correct",
  "validator.gt": "The value is less than or equal to {{ gt }}",
  "validator.ge": "The value is less than {{ ge }}",
  "validator.lt": "The value greater than or equal to {{ lt }}",
  "validator.le": "The value of more than {{ le }}",
  "validator.list": "Please select value",
  "validator.listSelect": "Please select value",
  "validator.alphabet": "You can only enter letters and numbers",
  "validator.all": "An invalid character"
};

config.setI18n(k => confTranslate[k] || 'unknown key');


class Test extends Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      data: {firstName: '', lastName: ''}
    };
  }

  async submit(data) {
    alert('You have just inputted firstName=' + data.firstName + ', lastName=' + data.lastName);
  }

  async validate(data) {
    const errors = {};

    if (!data.firstName) {
      errors.firstName = [new Error('The First Name is required')];
    }

    if (!data.lastName) {
      errors.lastName = [new Error('The Last Name is required')];
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
          <Input name="firstName" required label="First Name" />
          <Input name="lastName" required label="Last Name" />
        </Row>
        <Container>
          <Button type="submit" primary label="Click" />
        </Container>
      </SimpleForm>
    );
  }

}

class Test2 extends Component {

  constructor() {
    super();

    this.fetch = this.fetch.bind(this);
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async fetch() {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        firstName: 'John', 
        lastName: 'Snow'
      }), 500);
    });
  }

  async submit(data) {
    alert('You have just inputted firstName=' + data.firstName + ', lastName=' + data.lastName);
  }

  async validate(data) {
    const errors = {};

    if (!data.firstName) {
      errors.firstName = [new Error('The First Name is required')];
    }

    if (!data.lastName) {
      errors.lastName = [new Error('The Last Name is required')];
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  }

  render() {
    return (
      <SimpleForm 
        fetch={ this.fetch }
        validate={ this.validate }
        submit={ this.submit }
      >
        <Row>
          <Input name="firstName" required label="First Name" />
          <Input name="lastName" required label="Last Name" />
        </Row>
        <Container>
          <Button type="submit" primary label="Click" />
        </Container>
      </SimpleForm>
    );
  }

}

storiesOf('SimpleForm', module)
  .add('default', withReadme(Readme, () => {
    const style = {padding: '20px', width: '600px'};

    return (
      <React.Fragment>
        <div style={ style }>
          <Test />
        </div>
      </React.Fragment>
    );
  }))
  .add('remove', withReadme(Readme, () => {
    const style = {padding: '20px', width: '600px'};

    return (
      <React.Fragment>
        <div style={ style }>
          <Test2 />
        </div>
      </React.Fragment>
    );
  }));
  