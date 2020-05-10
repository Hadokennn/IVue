// 存放 dev 和 prod 通用配置
const { initConfig } = require('./bundle')
const { initLoader } = require('./loader')

// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 使用happypack，将文件解析任务分解成多个子进程并发执行
const HappyPack = require('happypack')
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})


const config = {
    devtool: 'inline-source-map',
    module: {
        rules: []
    },
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
        new VueLoaderPlugin(),
        new HappyPack({
            //用id来标识 happypack 处理类文件
            id: "happyBabel",
            //如何处理 用法和loader 的配置一样
            loaders: [
                {
                    loader: "babel-loader?cacheDirectory=true"
                }
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        })
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
