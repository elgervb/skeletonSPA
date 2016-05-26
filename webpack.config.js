const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    preLoaders: [
      {test: /\.js?$/, loaders: ['eslint-loader'], exclude: [/generator/, /node_modules/]}
    ],
    loaders: [
       {test: /\.js$/, exclude: [/generator/, /node_modules/], loader: 'ng-annotate!babel'},
       {test: /\.html$/, loader: 'raw'},
       {test: /\.scss$/, loader: 'style!css!sass'},
       {test: /\.css$/, loader: 'style!css'},
       {test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
       }
    ],
    imageWebpackLoader: {
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false
          },
          {
            removeEmptyAttrs: false
          }
        ]
      }
    }
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
