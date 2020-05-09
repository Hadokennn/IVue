const path = require('path')
// html插件，让插件为你生成一个HTML文件
const HTMLWebpackPlugin = require('html-webpack-plugin')

const resolve = (p) => path.resolve(__dirname, '..', p)

const outputDir = resolve('dist')
const entry = resolve('src/index.js')
const output = {}
const alias = require('./alias')

const htmlPlugins = [
    new HTMLWebpackPlugin({
        template: resolve('index.html')
    })
]

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
}



function initConfig (env) {
    resolveAlias()
    resolveOutput(env)
    return {
        entry,
        output,
        alias,
        htmlPlugins
    }
}

exports.initConfig = initConfig
exports.resolve = resolve
