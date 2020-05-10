const {resolve} = require("./bundle")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const vueLoader = {
    test: /\.vue$/,
    use: 'vue-loader'
}

const cssLoader = {
    test: /\.css$/,
    use: [
        'vue-style-loader',
        'css-loader',
        'postcss-loader'
    ]
}

const lessLoader = {
    test: /\.less$/,
    exclude: /node_modules/,
    use: [
        'vue-style-loader',
        'css-loader',
        'less-loader',
        'postcss-loader'
    ]
}

const jsLoader = {
    test: /\.js$/,
    //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
    loader: 'happypack/loader?id=happyBabel',
    //排除node_modules 目录下的文件
    exclude: /node_modules/
}

const fileLoader = {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                limit: 5000,
                // 分离图片至imgs文件夹
                name: "imgs/[name].[ext]",
            }
        },
    ]
}

const eslintLoader = {
    test: /\.(js|vue)$/,
    enforce: 'pre',
    exclude: /node_modules/,
    include: [resolve('src')],
    loader: 'eslint-loader',
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: true,
        cache: true
    }
}

exports.initLoader = function (env) {
    const loaders = []
    if (env !== 'dev') {
        cssLoader.use = [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../../'
                }
            },
            'css-loader',
            'postcss-loader'
        ]

        lessLoader.use = [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            'css-loader',
            'less-loader',
            'postcss-loader'
        ]
    } else {
        loaders.push(eslintLoader)
    }
    loaders.push(
        vueLoader,
        cssLoader,
        lessLoader,
        jsLoader,
        fileLoader
    )
    return loaders
}
