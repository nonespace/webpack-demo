const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");
module.exports = (env, argv) => {
  const dllBuild =
    argv.mode == "production"
      ? [
          new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "dll/manifest.json"),
          }),
          new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, "dll/react.js"),
          }),
        ]
      : [];
  return {
    mode: argv.mode,
    entry: {
      app: `${__dirname}/src/index.js`,
    },
    output: {
      filename: "[name][contenthash].js",
    },
    devServer: {
      // port: "3001",
      // compress: true,
      // open: true,
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          include: [path.resolve(__dirname, "src")],
          exclude: /node-module/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
            // {
            //   loader:"eslint-loader",
            //   options:{
            //     fix:true,
            //     emitWarning: true
            //   }
            // }
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              //下载两个 url-loader file-loader
              options: {
                // 图片低于8k 回转换成base64
                //优点:是减少请求次数, 缺点:文件变大   常见设置大小8kb
                limit: 8 * 1024,
                name: "/img/[name][contenthash:8].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(css|less)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "less-loader" },
            //帮助postcss 找到pagejson 中的browerList 里面的配置,加载制定的css 兼容样式
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  //post-preset-env 插件
                  require("postcss-preset-env")(),
                ],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", "ts", "tsx"],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].[contenthash].css`,
        chunkFilename: `css/[id].[contenthash].css`,
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          removeComments: true, //清除注释
          collapseWhitespace: true, //清理空格
        },
      }),
      new CleanWebpackPlugin({ removeFiles: ["dist"] }),
      new optimizeCssAssetsWebpackPlugin(),
      //告诉webpack 那些库不参与打包
      ...dllBuild
    ],
    optimization: {
      splitChunks: {
        chunks: "async",
        name: "utils",
      },
    },
  };
};
