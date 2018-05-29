/**
 * Class Components
 * 
 * @author Olena Gotovska
 */
export default class Components {

  constructor() {
    this._components = {};
    this._formComponents = [];
    this._submits = [];
    this._idx = {};
  }

  get(componentName, name) {
    return this._idx[componentName + '_' + name] || null;
  }

  set(item) {
    if (!this._components[item.component]) {
      this._components[item.component] = [];
    }

    this._components[item.component].push(item);

    if (item.props && (item.props.ref || item.props.name)) {
      this._idx[item.component + '_' + (item.props.ref || item.props.name)] = item;
    }
  }

  setFormField(item) {
    if (item && item.component && item.component.prototype && item.props && item.props.name) {
      if (typeof item.component.prototype.onChange === 'function') {
        this._formComponents.push(item);
      }
    }

    if (item && item.props && item.props.type && item.props.type === 'submit') {
      this._submits.push(item);
    }
  }

  listOfFields() {
    return this._formComponents;
  }

  listOfSubmits() {
    return this._submits;
  }

  listOf(name) {
    return this._components[name] || [];
  }

  toObject() {
    return this._components;
  }

}
