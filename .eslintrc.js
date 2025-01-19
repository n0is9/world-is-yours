module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    process: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'react/jsx-filename-extension': ['off'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // JS
    'no-multiple-empty-lines': 'off',
    semi: 2,
    'prefer-const': 2,
    curly: [2, 'all'],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-redeclare': [2, { builtinGlobals: true }],
    'no-console': 1,
    'operator-linebreak': 0,
    'brace-style': [1, '1tbs'],
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-param-reassign': [2, { props: true }],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'no-unused-vars': 1,

    // React
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'standard/no-callback-literal': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.js', '.jsx'] }],
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': [2, 'never'],
    'react-hooks/rules-of-hooks': 2,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['id', 'nesting'],
        },
        allowChildren: true,
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
