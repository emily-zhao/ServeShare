const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
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
