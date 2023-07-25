module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: './',
    project: ['tsconfig.json', 'client/tsconfig.json', 'server/tsconfig.json']
  },
  root: true,
  plugins: [
    'react-refresh',
    'react',
    'react-hooks',
    'import',
    'simple-import-sort',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    // indent: [2, 2, { SwitchCase: 1 }],
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/react-in-jsx-scope': 'off',
    'require-await': 'off',
    '@typescript-eslint/require-await': 'warn',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }]
  },

  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'client/tsconfig.json', 'server/tsconfig.json']
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      alias: {
        extensions: ['.ts', '.tsx'],
        map: [['@']]
      }
    },
    react: {
      version: 'detect'
    }
  }
};
