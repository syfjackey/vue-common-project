module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'alloy',
    'alloy/vue',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/component-tags-order": ["error", {
      "order": ["template", "script", "style"]
    }],
    'max-params': [0,4]
  }
}
