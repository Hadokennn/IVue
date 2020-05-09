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

exports.initLoader = function (env) {
    const loaders = []
    loaders.push(
        vueLoader,
        cssLoader,
        lessLoader
    )
    return loaders
}
