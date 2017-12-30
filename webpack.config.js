const jquery = require('jquery')
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const autoprefixer = require('autoprefixer')

const config = {
  entry: {
    app: './assets/js/app.js',
    sass: './assets/scss/app.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_site/assets'),
    publicPath: '/assets/',
    chunkFilename: '[name].js'
  },
  plugins: [
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000 // Minimum number of characters
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new ExtractTextPlugin({ // define where to save the file
      filename: './app.css',
      allChunks: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    require('autoprefixer')
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?![foundation-sites])/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    },
    {
      test: /\.js$/,
      use: ['source-map-loader'],
      enforce: 'pre'
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          url: false
        }
      }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }},
          { loader: 'postcss-loader', options: { sourceMap: 'inline' } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      })
    }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false,
      sourceMap: true
    })
  )
} else {
  config.devtool = 'eval-source-map',
  config.plugins.push(
    new BrowserSyncPlugin({
      server: './_site',
      port: 8000,
      files: './_site/**/*'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: false
    })
  )
}

module.exports = config
