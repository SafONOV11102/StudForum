const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = {
  // Другие настройки...
  resolve: {
    fallback: {
      vm: require.resolve("vm-browserify")
    }
  }
};