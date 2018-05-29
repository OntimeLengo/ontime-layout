const data = {
  'function': new Map(),
  'class': new Map(),
  'component': new Map(),
  'object': new Map(),
  'exec': new Map()
};

const types = Object.keys(data);

function getByType(type) {
  if (data[type]) {
    return data[type];
  } else {
    throw new Error('store/getByType: Unknown type ' + type);
  }
}

const store = {

  has: function(type, name) {
    return getByType(type).has(name);
  },

  get: function(type, name) {
    if (this.has(type, name)) {
      return getByType(type).get(name);
    } else {
      throw new Error('store/get: ' + type + '/' + name + ' has not found');
    }
  },

  set: function(type, name, value) {
    const store = getByType(type);
    
    if (this.has(type, name)) {
      throw new Error('store/set: ' + type + '\'s store already contains ' + name);
    }

    store.set(name, value);
  },

  delete: function(type, name) {
    if (!this.has(type, name)) {
      throw new Error('store/delete: ' + type + '/' + name + ' has not found');
    }

    getByType(type).delete(name);
  }

};

export default store;

export {
  types
};
