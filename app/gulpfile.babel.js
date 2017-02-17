import gulp     from 'gulp';
import webpack  from 'webpack';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  const config = require('./webpack.config.js');

  var compiler = webpack(config);

  serve({
    port:  3000,
    open: true,
    server: {baseDir: 'app'},
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

