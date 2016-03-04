import url from 'url';
/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 */
module.exports = (gulp, plugins, settings) => {
    return () => {
      let browserSync = plugins.browserSync.create();
      let proxy = plugins.proxyMiddleware;
      let port = settings.argv.port || settings.serverport;

      // proxy settings for /redirect
      let proxyOptions = url.parse('http://localhost:8080/redirect');
      proxyOptions.route = '/redirect';
      
      // watch any files in dist/*, reload on change
      gulp.watch([`${settings.dist}**/*`, `!${settings.dist}**/*.css`]).on('change', () => {
        browserSync.reload();
      });
      // inject css changes
      browserSync.watch([`${settings.dist}**/*.css`], (event, file) => {
        if (event === 'change') {
          browserSync.reload(file);
        }
      });

      browserSync.init({
        browser: ['google chrome'],
        ghostMode: {
          clicks: true,
          location: true,
          forms: true,
          scroll: true
        },
        injectChanges: true, // inject CSS changes (false force a reload)
        logLevel: 'info',
        open: false, // 'local', 'external', 'ui'
        port,
        reloadOnRestart: true,
        scrollProportionally: true, // Sync viewports to TOP position
        scrollThrottle: 50,
        server: {
          baseDir: settings.dist,
          middleware: [proxy(proxyOptions)]
        },
        ui: {
          port: port + 1,
          weinre: {
            port: port + 2
          }
        }
      });
    };
};