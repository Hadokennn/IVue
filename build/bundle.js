const path = require('path')
const alias = require('./alias')

const resolve = (p) => path.resolve(__dirname, '..', p)

const outputDir = resolve('dist')
// 配置模块入口
const entry = {
    index: resolve('src/index.js') // key值对应打包后的文件的name
}
// 配置如何输出最终想要的代码
const output = {}

function resolveAlias () {
    Object.keys(alias).forEach(attr => {
        const val = alias[attr]
        alias[attr] = resolve(val)
    })
}

function resolveOutput (env) {
    if (env === 'dev') {
        output.filename = 'js/[name].bundle.js'
    } else {
        output.filename = 'js/[name].bundle.[hash].js'
    }
    output.path = outputDir
    // output.publicPath = 'https://cdn.com.cn' // 有的时候我们想要把打包出来的资源放在 cdn 上面，比如我想给打包出来的 index.js 加上一个 cdn 网址前缀 https://cdn.com.cn，我们可以在 output 配置中添加 publicPath 选项即可实现
}



function initConfig (env) {
    resolveAlias()
    resolveOutput(env)
    return {
        entry,
        output,
        alias
    }
}

exports.initConfig = initConfig
exports.resolve = resolve
