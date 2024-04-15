require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'no-console': 'warn',
    quotes: ['error', 'single'],
    'prefer-const': 'error',
    indent: ['warn', 2],
    'comma-dangle': ['error', 'only-multiline'],
    semi: 'off',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    camelcase: ['error'],
    'func-style': ['error', 'expression'],
    'max-depth': ['error', 3],
    'no-alert': ['error'],
    'no-var': ['error'],
    'no-unused-vars': 'warn',
    'no-useless-catch': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [['@', './src']],
    },
  },
}
