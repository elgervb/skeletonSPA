import cache from 'gulp-cache';
/**
 * Clears the cache used by gulp-cache
 */
module.exports = (gulp, settings) => {
    return () => cache.clearAll();
};
