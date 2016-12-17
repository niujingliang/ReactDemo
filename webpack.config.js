var path = require('path');
var webpack = require('webpack');

var environment = process.env.NODE_ENV || 'development';

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name:'common',
    filename:'lib.js',
    minChunks:Infinity
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(environment)
  })
];
//生产环境下代码压缩
if(environment === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }));
}

module.exports = {
  devtool: 'eval',
  debug: true,
  entry:{
    app:'./src/index.js'
  },
  output: {
    path: path.resolve(__dirname,'./public/js/'),
    publicPath: '/public/js/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module:{
    loaders: [
      {
        test: /\.js?$/,exclude: /node_modules/,loader: 'babel', query: {
          presets: ['es2015','stage-1','react'],
          plugins: ['transform-runtime']
        }
      },
      {test: /\.css$/,loader:'style!css?module&localIdentName=[name]__[local]-[hash:base64:5]'},
      {test: /\.less$/,loaders: ['style', 'css', 'less']},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}  
    ]
  },
  plugins: plugins
};