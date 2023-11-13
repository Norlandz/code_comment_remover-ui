module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'next/core-web-vitals', 'plugin:@next/next/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'node_modules/**', 'next.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
    // ecmaFeatures: {
    //   jsx: true,
    // },
    // ecmaVersion: 12,
    // sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint', //
    // 'react-refresh',
    // 'react',
  ],
  rules: {
    // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    'prefer-const': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    'no-empty': 'warn', // dk ... so many , before didnt install ext / the npm .. dk
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    'no-inner-declarations': 'off',

    // https://github.com/vercel/next.js/discussions/24254
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    // ~~~// ;not_working; waste my time
    // doc specify multi things but unclear on what was there to take effect
    // default install of plugins are poor
    '@next/next/no-html-link-for-pages': 'error',
  },
};

// // const config = {
// // export default config;
// 
// // Cannot read config file: H:\Using\code_comment_remover-ui-awstest\.eslintrc.js Error: Unexpected token 'export'
// // dk . must cjs? ...
// 
// // []
// // I think we could update the `--init` command to read `package.json`, and if it has `"type": "module"` then create `.eslintrc.cjs` instead of `.eslintrc.js`.
// // <>
// // https://github.com/eslint/eslint/issues/14137
