module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-body-style': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'unicorn/no-array-reduce': 'off',
    'sonarjs/cognitive-complexity': 'warn',
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc' } },
    ],
    'jsdoc/require-jsdoc': [
      'warn',
      {
        require: {
          ArrowFunctionExpression: true,
          FunctionDeclaration: true,
          MethodDefinition: true,
        },
      },
    ],
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-hyphen-before-param-description': [
      'warn',
      'always',
      { tags: { '*': 'never', returns: 'always' } },
    ],
  },
};
