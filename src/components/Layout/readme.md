<h1>Layout</h1>

The layout is used to dynamically generate HTML layouts or areas from JSON configuration.

<h3>Props</h3>

| Property | Type          | Required |  Description       |
| -------- | ------------- | -------- | ------------------ |
| data     | array, object | false    | JSON configuration |
| parser   | function      | false    | The function is raised after parse JSON by default before call render |

<h4>data</h4>

The data chould be as object or array of objects. Object must have the structure:

| Property  | Type       | Required    | Description              |
| --------- | ---------- | ----------- | ------------------------ |
| component | string     | true        | Name of registered components. (Row, Input, Button etc) |
| props     | object     | false       | Component props |
| children  | array      | false       | Children components. Children Objects have the same structure |

<h4>parser</h4>

The parser is used to add custom functionality or change component props before render.

<h3>Example</h3>

```javascript
import { Component } from 'react';
import { Layout } from 'ontime-layout';

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
      }
    ]
  }
];

class Test extends Component {

  render() {
    return (<Layout data={ source } />);
  }

}
```
