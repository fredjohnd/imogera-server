module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-unused-vars': 'error',
    'func-names': 0,
    'space-before-function-paren': 0,
    'no-console': 0,
    'no-tabs': 'error',
    'no-underscore-dangle': 0,
    indent: 0,
    'object-curly-newline': 0,
  },
};
