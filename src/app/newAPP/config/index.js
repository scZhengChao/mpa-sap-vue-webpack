const env = process.env.NODE_ENV

const envConfig = require(`./${env}.js`).default
const commonConfig = {
    name:'hahah'
}
export default Object.assign(commonConfig,envConfig)