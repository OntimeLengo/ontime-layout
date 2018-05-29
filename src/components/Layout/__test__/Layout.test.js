import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Layout from '../Layout';

import { config } from '../../../';

import * as components from 'ontime-components';

for (let name in components) {
  if (!config.has('component', name)) {
    config.set('component', name, components[name]);
  }
}

describe('<Layout />', () => {
  it('default', () => {
    const data = {
      component: 'Row',
      children: [
        {component: 'Button'},
        {component: 'Button'}
      ]
    };

    const layout = shallow(
      <Layout 
        data={ data } 
        parser={ (data, components) => {
          expect(typeof data.component).toEqual('function');
          expect(components.listOf('Row')).toHaveLength(1);

          return { data, components };
        } }
      />
    );

    expect(typeof layout.instance().props.data.component).toEqual('function');
  });
});
