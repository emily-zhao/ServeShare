const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
     buy: __dirname + '/src/buy.js',
     host: __dirname + '/src/host.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: 'src/*.html', to: '', flatten:true },
            { from: 'src/*.png', to: '', flatten:true},
            { from: 'src/*.css', to: '', flatten:true},
        ]
    })
  ],
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: __dirname + '/dist'
  }
}
