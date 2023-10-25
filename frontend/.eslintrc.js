module.exports = {
    root: true,
    parserOptions: {
      parser: "babel-eslint",
      sourceType: 'module'
    },
    env: {
      browser: true,
    },
    extends: [
      "standard",
      "plugin:vue/recommended"
    ],
    plugins: [
      "html",
      "standard",
      "vue"
    ],
    // add your custom rules here
    rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }