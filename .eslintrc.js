module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // "quotes": [1, "single"], //引号类型 

    "space-before-function-paren": 0, // 函数定义时括号前面要不要有空格
    //关闭行末分号提示/报错
    'semi': 0,
    //关闭定义变量未使用提示/报错
    'no-unused-vars': 0,
    'indent': 'off',
    'no-trailing-spaces': 0,
    "no-tabs":"off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)'
    ],
    env: {
      mocha: true
    }
  }],

}
