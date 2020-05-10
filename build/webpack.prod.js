// 存放 prod 配置
// 合并配置文件
const webpackMerge = require('webpack-merge');
const webpackBaseFn = require('./webpack.base.js');
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = function (env, { option }) {
    const baseConfig = webpackBaseFn(env)
    const plugins = [
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin({
            verbose: true, // 开启在控制台输出信息
            dry: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        })
    ]
    return webpackMerge(baseConfig, {
        mode: 'production',
        stats: {
            chunkGroups: false,
            chunkModules: false,
            chunkOrigins: false,
            modules: false,
            moduleTrace: false,
            source: false,
            children: false
        },
        plugins,
        optimization: {
            // 分离chunks
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial" // 只打包初始时依赖的第三方
                    }
                }
            },
            minimizer: [
                // 压缩JS
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true, // 去除debugger
                            drop_console: true // 去除console.log
                        },
                    },
                    cache: true, // 开启缓存
                    parallel: true, // 平行压缩
                    sourceMap: false // set to true if you want JS source maps
                }),
                // 压缩css
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    })
}
