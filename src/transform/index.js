import store, { types } from '../store';
import Components from '../libs/Components';

function parse(data = {}, components = {}) {
  // has parsed
  if (data && typeof data.component === 'function') {
    return { data, components };
  }

  if (Array.isArray(data)) {
    for (let i = 0; data[i]; i++) {
      parse(data[i], components);
    }
  } else if (typeof data === 'object') {
    if (!data.component) {
      return { data, components };
    }

    components.set(data);

    data.component = store.get('component', data.component);

    if (data.props) {
      for (let key in data.props) {
        data.props[key] = transform.convert(data.props[key]);
      }
    }

    components.setFormField(data);

    if (Array.isArray(data.children)) {
      parse(data.children, components);
    }
  } else {
    throw new Error('transform/parse: Unknown component type. It must be array or object.');
  }

  return { data, components };
}

const transform = {

  /**
   * Parse JSON config
   * 
   * @param {object} data JSON configuration
   * @return {object}
   */
  parse: function(data = {}) {
    return parse(data, new Components());
  },

  /**
   * Convert value to function, class, component etc.
   * 
   * @param {any} data Any value
   * @return {any}
   */
  convert: function(data) {
    let args = [], req;

    if (typeof data === 'string') {
      req = data;
    } else if (Array.isArray(data)) {
      req = data[0];
      args = data.slice(1);
    } else if (typeof data === 'object' && data.resource) {
      req = data.resource;
      args = Array.isArray(data.params) ? data.params : [];
    }

    let result;

    try {
      result = this.resource(req);
    } catch (err) {
      return data;
    }

    if (result.type === 'pipeline') {
      let pipelineCalls = args.map(item => transform.convert(item));

      return async (...pipeArgs) => {
        let response = pipeArgs;

        for (let i = 0; pipelineCalls[i]; i++) {
          let fn = pipelineCalls[i];

          if (typeof fn === 'function') {
            if (i === 0) {
              response = await fn(...response);
            } else {
              response = await fn(response);
            }
          } else {
            throw new Error('transform/parse/pipeline: Argument must be a link to refistered function etc');
          }
        }
      };
    }

    return (result.type === 'exec') ? result.res(...args) : async (...fnArgs) => {
      const fn = result.res;
      const fullArgs = [...fnArgs, ...args];

      return await fn(...fullArgs);
    };
  },

  /**
   * Transform string to resource
   * 
   * @param {string} data Resource name
   * @return {object}
   */
  resource: function(data) {
    if (typeof data !== 'string') {
      throw new Error('transform/resource: property resource must be string');
    }

    const keys = data.split('/');
    const type = keys[0];
    const name = keys[1];
    const method = keys[2];

    if (type === 'pipeline') {
      return { type, res: null };
    }

    if (!types.includes(type)) {
      throw new Error('transform/resource: Unknown resource type "' + type + '"');
    }

    let res = store.get(type, name);

    if (method) {
      if (res[method]) {
        res = res[method].bind(res);
      } else {
        throw new Error('transform/resource: ' + type + '/' + name + ' does not have method "' + method + '"');
      }
    }

    return { type, res };
  }

};

export default transform;
