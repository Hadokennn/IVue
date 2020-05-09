// 存放 prod 配置
// 合并配置文件
const webpackMerge = require('webpack-merge');
const webpackBaseFn = require('./webpack.base.js');


module.exports = function (env, { option }) {
    const baseConfig = webpackBaseFn(env)
    const plugins = [
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].[hash].css'
        // })
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
        plugins
    })
}
