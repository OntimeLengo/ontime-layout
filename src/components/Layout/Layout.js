import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transform from '../../transform';

function parse(data, components) {
  return { data, components };
}

/**
 * Class Layout
 * 
 * @author Helen Gotovska
 */
export default class Layout extends Component {

  static propTypes = {
    parser: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  static defaultProps = {
    parser: parse,
    data: {}
  }

  renderData(data, idx) {
    if (Array.isArray(data)) {
      return data.map((item, idx) => this.renderData(item, idx));
    } else if (typeof data === 'object' && data.component) {
      let props = data.props || {};
      let Comp = data.component;
      let children = null;

      props.key = ((props.name || '') + (props.value || '')) || (idx + 1);

      if (Array.isArray(data.children)) {
        children = this.renderData(data.children);
      }

      return (<Comp { ...props }>{ children }</Comp>);
    } else {
      return null;
    }
  }

  render() {
    let result = transform.parse(this.props.data);

    result = this.props.parser(result.data, result.components);

    return (
      <React.Fragment>
        { this.renderData(result.data) }
      </React.Fragment>
    );
  }

}