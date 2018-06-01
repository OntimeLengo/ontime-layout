let defI18n = key => key;

function gettext(key, options) {
  return defI18n(key, options);
}

function config(fn) {
  defI18n = fn;
}

export {

  gettext,

  config

};
