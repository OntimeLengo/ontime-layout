import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withReadme } from 'storybook-readme';

import '../node_modules/ontime-components/dist/main.css';
import '../dist/main.css';
import * as components from 'ontime-components';

import { config, parse, Layout } from '../src';

import Readme from '../src/components/Layout/readme.md';

for (let name in components) {
  if (!config.has('component', name)) {
    config.set('component', name, components[name]);
  }
}

if (!config.has('function', 'select-data')) {
  config.set('function', 'select-data', async () => [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ]);
}

if (!config.has('function', 'fn1')) {
  config.set('function', 'fn1', async (e, acc) => {
    console.log('call fn1');

    return acc + 10;
  });
}

if (!config.has('function', 'fn2')) {
  config.set('function', 'fn2', acc => {
    console.log('call fn2');

    return acc + 100;
  });
}

if (!config.has('object', 'obj1')) {
  const obj = {
    test: function(acc) {
      console.log('call obj1.test');
      console.log('result ->', acc);
      
      return acc + 1000;
    }
  };
  config.set('object', 'obj1', obj);
}

storiesOf('Layout', module)
  .add('default', withReadme(Readme, () => {
    const style = {padding: '20px'};

    const source = [
      {
        component: 'Row',
        children: [
          {
            component: 'Input',
            props: {
              name: 'name',
              label: 'test 1',
              leftIcon: 'user',
              onClick: ['pipeline', ['function/fn1', 50], 'function/fn2', 'object/obj1/test']
            }
          },
          {
            component: 'Select',
            props: {
              name: 'region',
              label: 'test 2',
              dataSource: 'function/select-data'
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
              label: 'Button 1',
              primary: true
            }
          },
          {
            component: 'Button',
            props: {
              label: 'Button 2'
            }
          }
        ]
      }
    ];

    return (
      <React.Fragment>
        <div style={ style }>
          <Layout data={ source } />
        </div>
      </React.Fragment>
    );
  }));
