import validators from './validators';

/**
 * validator
 *
 * @author Olena Gotowska
 * @description Use for validate values
 */
export default function validator(allRules = {}) {
  const allRulesKeys = Object.keys(allRules);

  return async function(data = {}, onlyOne) {
    const errors = {};

    let keys;

    if (onlyOne) {
      if (allRules[onlyOne]) {
        keys = [onlyOne];
      } else {
        return true;
      }
    } else {
      keys = allRulesKeys;
    }

    for (let i = 0; keys[i]; i++) {
      const name = keys[i];
      const rules = allRules[name];
      const value = data[name];
      const rulesKeys = Object.keys(rules);

      for (let k = 0; rulesKeys[k]; k++) {
        const ruleName = rulesKeys[k];
        const rule = rules[ruleName];

        let fn;

        if (typeof rule === 'function') {
          fn = rule;
        } else if (validators[ruleName]) {
          fn = validators[ruleName];
        } else {
          break;
        }

        if (ruleName === 'confirm') {
          try {
            await fn(value, data[rule], data);
          } catch (err) {
            (!errors[name]) && (errors[name] = []);
            
            errors[name].push(err);
          }
        } else if (typeof rule === 'function') {
          try {
            await fn(value, data);
          } catch (err) {
            (!errors[name]) && (errors[name] = []);
            
            errors[name].push(err);
          }
        } else {
          try {
            await fn(value, rule, data);
          } catch (err) {
            (!errors[name]) && (errors[name] = []);
            
            errors[name].push(err);
          }
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      throw errors;
    }
  }
}
