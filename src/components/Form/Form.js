import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';

function parse(data, components) {
  return { data, components };
}

async function validate() {
  return true;
}

async function submit() {
  return true;
}

/**
 * Class Form
 * 
 * @author Olena Gotovska
 * @created 27/05/2018
 */
export default class Form extends Component {

  static propTypes = {
    data: PropTypes.object,
    fetch: PropTypes.func,
    parser: PropTypes.func,
    schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    validate: PropTypes.func,
    submit: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    data: {},
    parser: parse,
    schema: {},
    validate: validate,
    submit: submit
  }

  constructor(props) {
    super(props);

    this.data = Object.assign({}, this.props.data);
    this.fields = {};

    this._parsed = false;
    this._components = null;

    this.parser = this.parser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      errors: null
    };
  }

  async setState(state) {
    return new Promise(resolve => super.setState(state, () => resolve()));
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    setTimeout(() => {
      this._parsed = false;
      this._components = null;
      this.data = null;
      this.fields = null;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schema !== this.props.schema) {
      this._parsed = false;
      this.fields = {};
    }

    if (nextProps.data !== this.props.data) {
      this.data = Object.assign({}, nextProps.data);
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

      console.log('fetched', this.data);
    }
  }

  parser(data, components) {
    if (this._parsed) {
      // Set errors for fields
      this._components.listOfFields().forEach(item => {
        // Set data value
        if (this.data.hasOwnProperty(item.props.name)) {
          item.props.value = this.data[item.props.name];
        }
        
        if (this.state.errors && this.state.errors[item.props.name]) {
          item.props.errors = this.state.errors[item.props.name];
        } else {
          item.props.errors = null;
        }

        item.props.disabled = this.props.disabled;
      });

      // Set loading for submit buttons
      this._components.listOfSubmits().forEach(item => {
        item.props = item.props || {};

        item.props.loading = this.state.loading;
        item.props.disabled = this.state.loading;
      });

      return { data, components };
    } else {
      this._components = components;

      this.props.parser && this.props.parser(data, components);

      components.listOfFields().forEach(item => {
        item.props = item.props || {};

        // Mount fields to fields scope
        item.props.ref = c => (this.fields[item.props.name] = c);

        // Set data value
        if (this.data.hasOwnProperty(item.props.name)) {
          item.props.value = this.data[item.props.name];
        }

        // Set errors by default
        if (this.state.errors && this.state.errors[item.props.name]) {
          item.props.errors = this.state.errors[item.props.name];
        } else {
          item.props.errors = null;
        }

        // Iterсept onChage handler for fields
        if (item.props.onChange) {
          let prev = item.props.onChange;

          item.props.onChange = (...args) => {
            prev(...args);

            this.onChange(item.props.name, this.fields[item.props.name].value, ...args);
          };
        } else {
          item.props.onChange = (...args) => {
            this.onChange(item.props.name, this.fields[item.props.name].value, ...args);
          }
        }

        // Iterсept onBlur handler for fields
        if (item.props.onBlur) {
          let prev = item.props.onBlur;

          item.props.onBlur = (...args) => {
            prev(...args);

            this.onBlur(item.props.name, this.fields[item.props.name].value, ...args);
          };
        } else {
          item.props.onBlur = (...args) => {
            this.onBlur(item.props.name, this.fields[item.props.name].value, ...args);
          }
        }
      });

      this._parsed = true;

      return { data, components };
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
      <form className={ 'ontime-form ' + (this.props.className || '') } onSubmit={ this.onSubmit }>
        <Layout
          data={ this.props.schema }
          parser={ this.parser }
        />
      </form>
    );
  }

}