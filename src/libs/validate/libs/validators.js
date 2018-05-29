/* eslint-disable */

import { gettext } from '../gettext';

/**
 * Function's list for validation values
 *
 * @author Olena Gotowska
 */

const errors = {
  req: 'validator.req',
  email: 'validator.email',
  url: 'validator.url',
  max: 'validator.max',
  min: 'validator.min',
  maxLen: 'validator.maxLen',
  minLen: 'validator.minLen',
  confirm: 'validator.confirm',
  regExp: 'validator.regExp',
  gt: 'validator.gt',
  ge: 'validator.ge',
  lt: 'validator.lt',
  le: 'validator.le',
  list: 'validator.list',
  listSelect: 'validator.listSelect',
  alphabet: 'validator.alphabet',
  all: 'validator.all'
};

function lang(key, options) {
  return gettext(key, options) || key;
}

function Req(value) {
  if (typeof value === 'undefined' || typeof value === 'boolean' || value === null) {
    value = '';
  }

  if (typeof value === 'number' && value > 0) {
    return true;
  } else if (typeof value === 'string') {
    value = value.trim();

    if (value && value.length > 0) {
      return true;
    } else {
      throw new Error(lang(errors.req));
    }
  } else if (Array.isArray(value)) {
    if (value.length > 0) {
      return true;
    } else {
      throw new Error(lang(errors.req));
    }
  } else if (typeof value === 'object') {
    if (Object.keys(value).length > 0) {
      return true;
    } else {
      throw new Error(lang(errors.req));
    }
  } else {
    throw new Error(lang(errors.req));
  }

  return true;
}

function Email(value) {
  let r = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (value && value.length > 0 && r.test(value)) {
      return true;
    } else {
      throw new Error(lang(errors.email));
    }
  }

  return true;
}

function Url(value) {
  let r = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (value === null) {
    return true;
  } else {
    if (value && value.length > 0 && r.test(value)) {
      return true;
    } else {
      throw new Error(lang(errors.url));
    }
  }

  return true
}

function Max(value, max) {
  if (value === null) {
    return true;
  } else {
    if (value.toString().indexOf('.') >= 0) {
      value = parseFloat(value);
    } else {
      value = parseInt(value, 10);
    }

    if (max >= value) {
      return true;
    } else {
      throw new Error(lang(errors.max, { max }));
    }
  }

  return true;
}

function Min(value, min) {
  if (value === null) {
    return true;
  } else {
    if (value.toString().indexOf('.') >= 0) {
      value = parseFloat(value);
    } else {
      value = parseInt(value, 10);
    }
    if (min <= value) {
      return true;
    } else {
      throw new Error(lang(errors.min, { min }));
    }
  }

  return true;
}

function MaxLen(value, max) {
  if (value === null) {
    return true;
  } else {
    value = value.toString().trim();

    if (max >= value.length) {
      return true;
    } else {
      throw new Error(lang(errors.maxLen, { max }));
    }
  }

  return true;
}

function MinLen(value, min) {
  if (value === null) {
    return true;
  } else {
    value = value.toString().trim();

    if (min <= value.length) {
      return true;
    } else {
      throw new Error(lang(errors.minLen, { min }));
    }
  }

  return true;
}

function Reg(value, r) {
  r = RegExp(r);

  if (value === null) {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(lang(errors.regExp));
    }
  }

  return true;
}

function Confirm(value, confirm) {
  if (value === confirm) {
    return true;
  } else {
    throw new Error(lang(errors.confirm));
  }

  return true;
}

function Gt(value, gt) {
  value = parseInt(value, 10) || 0;

  if (value > gt) {
    return true;
  } else {
    throw new Error(lang(errors.gt, { gt }));
  }

  return true;
}

function Ge(value, ge) {
  value = parseInt(value, 10) || 0;

  if (value >= ge) {
    return true;
  } else {
    throw new Error(lang(errors.ge, { ge }));
  }

  return true;
}

function Lt(value, lt) {
  value = parseInt(value, 10) || 0;

  if (value < lt) {
    return true;
  } else {
    throw new Error(lang(errors.lt, { lt }));
  }

  return true;
}

function Le(value, le) {
  value = parseInt(value, 10) || 0;

  if (value <= le) {
    return true;
  } else {
    throw new Error(lang(errors.le, { le }));
  }

  return true;
}

function ListLen(value) {
  if (value.length > 0) {
    return true;
  } else {
    throw new Error(lang(errors.list));
  }

  return true;
}

function ListSelect(value) {
  if (value.length > 0) {
    return true;
  } else {
    throw new Error(lang(errors.listSelect));
  }

  return true;
}

function Alphabet(value) {
  let r = /^[a-zA-Z0-9\s_\-\.,\'"\%\#\$\(\)АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя].+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(lang(errors.alphabet));
    }
  }

  return true;
}

function All(value) {
  let r = /^[^<>]+$/;

  if (value === null || value === '') {
    return true;
  } else {
    if (r.test(value)) {
      return true;
    } else {
      throw new Error(lang(errors.all));
    }
  }

  return true;
}

const validators = {
  req: Req,
  email: Email,
  url: Url,
  max: Max,
  min: Min,
  max_len: MaxLen,
  maxLen: MaxLen,
  min_len: MinLen,
  minLen: MinLen,
  confirm: Confirm,
  reg_exp: Reg,
  regExp: Reg,
  gt: Gt,
  ge: Ge,
  lt: Lt,
  le: Le,
  list: ListLen,
  listSelect: ListSelect,
  alphabet: Alphabet,
  all: All
};

export default validators;

export {
  errors
};

/* eslint-enable */
