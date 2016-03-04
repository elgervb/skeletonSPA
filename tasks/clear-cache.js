/**
 * Clears the cache used by gulp-cache
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      plugins.cache.clearAll();
    };
};
