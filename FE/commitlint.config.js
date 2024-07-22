module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['main', 'dev', 'feature', 'chore', 'fix']],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-pattern': [
      2,
      'always',
      /^(main|dev|chore|fix): \w+|^feature\(\w+\): \[\w+\] \w+/,
    ],
  },
};
