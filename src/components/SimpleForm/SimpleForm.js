import React, { Component } from 'react';
import PropTypes from 'prop-types';

async function validate() {
  return true;
}

async function submit() {
  return true;
}

let id = 1;

/**
 * Class SimpleForm
 * 
 * @author Helen Gotovska
 */
export default class SimpleForm extends Component {

  static propTypes = {
    data: PropTypes.object,
    fetch: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    validate: PropTypes.func,
    submit: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onValidate: PropTypes.func,
    children: PropTypes.any
  }

  static defaultProps = {
    data: {},
    validate: validate,
    submit: submit
  }

  constructor(props) {
    super(props);

    this.data = Object.assign({}, this.props.data);
    this.fields = {};

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      errors: null,
      reload: false
    };
  }

  async setState(state) {
    return new Promise(resolve => super.setState(state, () => resolve()));
  }

  parse(children) {
    return React.Children.map(children, el => {
      const elProps = el.props || {};
      const props = {};

      let cloneEl;

      if (elProps.name && this.data.hasOwnProperty(elProps.name)) {
        const name = elProps.name;

        if (elProps.value !== this.data[name]) {
          id++;

          props.key = 'k-' + id;

          props.value = this.data[name];
        }

        props.ref = c => (this.fields[name] = c);

        props.disabled = this.props.disabled;

        if (this.state.errors && this.state.errors[name]) {
          props.errors = this.state.errors[name];
        } else {
          props.errors = null;
        }

        if (el.type.prototype && el.type.prototype.onChange && el.type.prototype.onBlur) {
          let prevChange = elProps.onChange;
          let prevBlur = elProps.onBlur;

          props.onChange = (...args) => {
            prevChange && prevChange(...args);

            this.onChange(name, this.fields[name].value, ...args);
          };

          props.onBlur = (...args) => {
            prevBlur && prevBlur(...args);

            this.onBlur(name, this.fields[name].value, ...args);
          };
        }
      }

      if (elProps.type === 'submit') {
        props.loading = this.state.loading;
      }

      if (elProps.children) {
        const cloneChildren = this.parse(elProps.children);

        cloneEl = React.cloneElement(el, props, ...cloneChildren);
      } else {
        cloneEl = React.cloneElement(el, props);
      }

      return cloneEl;
    });
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    setTimeout(() => {
      this.data = null;
      this.fields = null;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.data = Object.assign({}, nextProps.data);

      this.setState({reload: !this.state.reload});
    }
  }

  async fetch() {
    if (this.props.fetch) {
      let data;

      await this.setState({loading: true});

      try {
        data = await this.props.fetch();
      } catch (error) {
        await this.setState({loading: false});

        return;
      }

      this.data = Object.assign({}, data);

      await this.setState({loading: false});
    }
  }

  onChange(name, value, ...args) {
    if (this.props.disabled) {
      return;
    }

    this.data[name] = value;

    this.props.onChange && this.props.onChange(name, value, this.data, ...args);
  }

  async onBlur(name, value, ...args) {
    if (this.props.disabled) {
      return;
    }

    let errors = Object.assign({}, this.state.errors);

    delete errors[name];

    try {
      await this.props.validate(this.data, name);
    } catch (err) {
      errors = Object.assign({}, errors, err);
    }

    this.props.onValidate && this.props.onValidate(errors, this.data, name);

    await this.setState({errors: errors});

    this.props.onBlur && this.props.onBlur(name, value, this.data, ...args);
  }

  async onSubmit(e) {
    if (this.state.loading) {
      return;
    }
    
    let errors = null;
    let isOk = true;

    if (e && e.preventDefault()) {
      e.preventDefault();
    }

    await this.setState({loading: true});

    try {
      await this.props.validate(this.data);
    } catch (err) {
      errors = Object.assign({}, errors, err);
      isOk = false;
    }

    this.props.onValidate && this.props.onValidate(errors, this.data);

    await this.setState({errors: errors});

    if (!isOk) {
      await this.setState({loading: false});

      return;
    }

    try {
      await this.props.submit(this.data);
    } catch (error) {
      errors = Object.assign({}, errors);
    }

    await this.setState({errors: errors, loading: false});
  }

  render() {
    return (
      <form className={ 'ontime-simpleform ' + (this.props.className || '') } onSubmit={ this.onSubmit }>
        { this.parse(this.props.children) }
      </form>
    );
  }

}