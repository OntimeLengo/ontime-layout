import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withReadme } from 'storybook-readme';

import '../node_modules/ontime-components/dist/main.css';
import '../dist/main.css';
import { Input, Row, Button, Checkbox } from 'ontime-components';

import { config, SimpleForm, validator } from '../src';

import Readme from '../src/components/Form/readme.md';

if (!config.has('function', 'select-data')) {
  config.set('function', 'select-data', async () => [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ]);
}

function getSource() {
  return [
    {
      component: 'Row',
      children: [
        {
          component: 'Checkbox',
          props: {
            name: 'check',
            label: 'Check'
          }
        },
        {
          component: 'Input',
          props: {
            name: 'name',
            label: 'User name',
            leftIcon: 'user'
          }
        },
        {
          component: 'Input',
          props: {
            type: 'email',
            name: 'email',
            label: 'Email',
            leftIcon: 'at'
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
}

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

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  async setState(state) {
    return new Promise(resolve => super.setState(state, () => resolve()));
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    setTimeout(() => {
      this.setState({data: {name: '123', email: 'test100@test.com', check: true}});
    }, 1000);
  }

  render() {
    const rules = {
      name: {
        req: true,
        maxLen: 10
      },
      email: {
        email: true,
        req: true,
        fn: function() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
              // reject(new Error('Custom Error'));
            }, 200);
          });
        }
      }
    };

    return (
      <SimpleForm data={ this.state.data } validate={ validator(rules) } submit={ action('submit') }>
        <Row>
          <Checkbox name="check" label="Check" />
          <Input name="name" label="User name" leftIcon="user" value="adasdasds" />
          <Input type="email" name="email" label="Email" leftIcon="at" />
        </Row>
        <Row>
          <Button type="submit" label="Save" primary={ true } />
          <Button label="Reset" />
        </Row>
      </SimpleForm>
    );
  }

}

storiesOf('SimpleForm', module)
  .add('set props data and after remote fetch', withReadme(Readme, () => {
    const style = {padding: '20px'};

    return (
      <React.Fragment>
        <div style={ style }>
          <Test />
        </div>
      </React.Fragment>
    );
  }));
  