"use strict";

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
  },
  env: {
    es2022: true,
    node: true,
  },
};
