module.exports = {
  moduleNameMapper: {
    transformIgnorePatterns: ['/node_modules/', '.css'],
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    // module must come first
    // '\\.module\\.css$': 'identity-obj-proxy',
    // '\\.css$': require.resolve('./test/style-mock.js'),

  },
};
