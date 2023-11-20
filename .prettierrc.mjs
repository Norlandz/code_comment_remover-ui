/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 200,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        parser: 'yaml',
        printWidth: 500,
      },
    },
  ],

};

export default config;


//   // plugins: ['prettier-plugin-java'],
//   // parser: 'java',
// 
//   // guess native support jsx emm
//   // seems does work ... just some fail & do need param ..
//   // parser: "babel",
//   parser: 'typescript', // only this knows the entrypoint ...
//   // filepath: 'foo.js',
//   tabWidth: 2,
//   printWidth: 160,
//   // entrypoint: entrypoint,
//   singleQuote: true,

// {
//   "arrowParens": "always",
//   "bracketSpacing": true,
//   "endOfLine": "lf",
//   "htmlWhitespaceSensitivity": "css",
//   "insertPragma": false,
//   "singleAttributePerLine": false,
//   "bracketSameLine": false,
//   "jsxBracketSameLine": false,
//   "jsxSingleQuote": false,
//   "printWidth": 200,
//   "proseWrap": "preserve",
//   "quoteProps": "as-needed",
//   "requirePragma": false,
//   "semi": true,
//   "singleQuote": true,
//   "tabWidth": 2,
//   "trailingComma": "es5",
//   "useTabs": false,
//   "embeddedLanguageFormatting": "auto",
//   "vueIndentScriptAndStyle": false,
//   "filepath": "h:\\Using\\code_comment_remover-ui-awstest\\asdsad.ts",
//   "parser": "typescript"
// }

