module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['/dist', '/dev.ts', '**/*.d.ts', 'packages/**/*.js', '/cdn'],
  globals: {
    loadResource: true,
    ReactDOM: true,
    React: true,
    antd: true,
  },
  rules: {
    // '@typescript-eslint/rule-name': 'error',
    camelcase: 'off',
    'no-shadow': 'off',
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-use-before-define': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': ['off'],
    'no-console': ['off'],
    'no-debugger': ['error'],
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-unused-vars': ['off'],
    'no-plusplus': ['off'],
    'no-bitwise': ['error', { allow: ['~'] }],
    eqeqeq: 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
