// 存放 dev 和 prod 通用配置
const webpack = require("webpack")

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { initConfig } = require('./bundle')
const { initLoader } = require('./loader')

// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const config = {
    devtool: 'inline-source-map',
    module: {
        rules: []
    },
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin({
            verbose: true, // 开启在控制台输出信息
            dry: true
        }),
        // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
        new VueLoaderPlugin()
    ]
}

module.exports = function (env) {
    const {
        entry,
        output,
        alias,
        htmlPlugins
    } = initConfig(env)
    const loaders = initLoader(env)
    config.entry = entry
    config.output = output
    config.resolve.alias = alias
    config.module.rules.push(...loaders)
    config.plugins.push(...htmlPlugins)

    return config
}
