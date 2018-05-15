const {injectBabelPlugin} = require('react-app-rewired');
/* config-overrides.js */
module.exports = function override(config, env) {
  config = injectBabelPlugin([
    'import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }
  ], config);
  return config;
}