module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {'__DEV__': true},
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
        jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'babel'],
  rules: {
    // Handpicked from list at: https://eslint.org/docs/rules/

    // Possible errors
    'no-template-curly-in-string': 'error',

    // Best practices
    'array-callback-return': 'error',
    'consistent-return': 'error',
    'curly': ['warn', 'multi-or-nest', 'consistent'],
    'eqeqeq': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'babel/no-invalid-this': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'warn',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'warn',
    'radix': 'error',
    'require-await': 'warn',

    // Variables
    'no-shadow': 'warn',
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',

    // Stylistic
    'array-bracket-spacing': ['warn', 'never'],
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs'],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['warn'],
    'func-call-spacing': ['warn', 'never'],

    // This breaks too much, especially when including loops in JSX interpolations
    // 'indent': ['warn', 2, {SwitchCase: 1}],

    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'line-comment-position': ['warn', {position: 'above', ignorePattern: 'TODO'}],
    'linebreak-style': ['error', 'unix'],
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'warn',
    'no-mixed-operators': 'warn',
    'no-multi-assign': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-new-object': 'error',
    'no-trailing-spaces': 'warn',
    'quote-props': ['warn', 'consistent-as-needed'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'semi-spacing': 'warn',
    'semi-style': 'error',
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'never'],
    'unicode-bom': 'error',

    // ECMAScript 6
    'arrow-spacing': 'warn',
    'no-confusing-arrow': 'warn',
    'no-duplicate-imports': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'rest-spread-spacing': 'error',
    'template-curly-spacing': 'warn',

    // React
    'react/no-access-state-in-setstate': 'error',
    'react/no-deprecated': 'off', // TODO: Turn me on after fixing deprecation; produces a class-wide redliner currently
    'react/no-did-mount-set-state': 'error',
    'react/no-typos': 'warn',
    'react/no-this-in-sfc': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-unused-state': 'warn',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],

    // Use skipUndeclared so we can use stateless components without propTypes
    'react/prop-types': ['error', {skipUndeclared: true}],

    'react/require-default-props': 'error',
    'react/jsx-curly-spacing': ['warn', {when: 'never', children: false}],
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': ['warn'],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': 'error',
  }
}