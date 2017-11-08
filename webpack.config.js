module.exports = {
  entry: './examples/app.js',
  output: {
    path: __dirname + '/examples',
    filename: 'bundle.js',
    publicPath: '/examples/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: 'source-map'
};
