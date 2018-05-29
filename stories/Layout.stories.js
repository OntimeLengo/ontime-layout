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
              leftIcon: 'user'
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
