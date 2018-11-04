import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button } from 'ontime-components';

import SimpleForm from '../../SimpleForm';

describe('<SimpleForm />', () => {
  it('default', () => {
    const dataSource = {
      name: '111',
      email: '222'
    };

    const sf = shallow(
      <SimpleForm data={ dataSource } >
        <Input name="name" required />
        <Input name="email" type="email" required />
        <Button type="submit" label="Save" />
      </SimpleForm>
    );

    expect(sf.instance().props.data.name).toEqual('111');
    expect(sf.instance().props.data.email).toEqual('222');
  });
});
