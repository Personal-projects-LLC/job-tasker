module.exports = {
  extends: [
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  parserOptions: {
    project: './cypress/tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
  ignorePatterns: ['!cypress/**/*'],
  overrides: [
    {
      files: ['cypress/**/*.ts', 'cypress/**/*.js'],
      parserOptions: {
        project: './cypress/tsconfig.json',
      },
    },
  ],
};
