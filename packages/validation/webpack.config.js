const path = require('path');

const config = {
  devtool: 'source-map',
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
    extensions: ['.js', '.ts', '.tsx', 'css', '.sass']
  },
  entry: {
    index: path.resolve('src/index.ts')
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: '',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'tslint-loader',
          options: {
            emitErrors: true
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
    //   {
    //     test: /\.sass$/,
    //     exclude: path.resolve('node_modules'),
    //     loader: heraCSS.extract({
    //       use: [
    //         {
    //           loader: 'css-loader',
    //           options: {
    //             modules: true,
    //             importLoaders: 1,
    //             localIdentName: "[name]__[local]___[hash:base64:5]",
    //             minimize: false,
    //             sourceMap: true,
    //           }
    //         },
    //         {
    //           loader: 'sass-loader',
    //           options: {
    //             // auto import our includes
    //             data: '@import "src/style/brand-vars"',
    //             sourceMap: true
    //           }
    //         }
    //       ]
    //     })
    //   },
    ]
  },
  plugins: [
  ]
};

module.exports = config;