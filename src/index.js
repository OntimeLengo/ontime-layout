import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

import store from './store';
import transform from './transform';
import Layout from './components/Layout';
import Form from './components/Form';
import { validators, validator, config as setI18n } from './libs/validate';

const config = {

  set: function(...args) {
    store.set(...args);

    return this;
  },

  get: function(...args) {
    return store.get(...args);
  },

  delete: function(...args) {
    store.delete(...args);

    return this;
  },

  has: function(...args) {
    return store.has(...args);
  },

  setI18n: function(fn) {
    setI18n(fn);
  }

};

function parse(...args) {
  return transform.parse(...args);
}

export {

  Form,
  
  Layout,

  validator,

  validators,

  config,

  parse

};
