const env = process.env.NODE_ENV.trim()
const option = process.env.OPTION ? process.env.OPTION.trim() : ''
const webpackConfigFn = require(`./builda`)
module.exports = webpackConfigFn(env, { option })
