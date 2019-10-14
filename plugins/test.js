const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

module.exports = class TestWebpackPlugin {
  constructor(options) {
    this.options = options
    console.log('test plugin options:', options)
  }

  apply(complier) {
    complier.plugin('emit', function(complication, callback) {
      setTimeout(function () {
        console.log("Done with async work...");
        callback();
    }, 1000);
    })
  }
}