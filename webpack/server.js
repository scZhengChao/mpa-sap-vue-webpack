const webpack = require('webpack');
const config = require('./webpack.dev.config.js');
const webpackDevServer = require('webpack-dev-server');
const webCfg = require('./webpack.config.js')
const chalk = require('chalk');


if(Object.keys(webCfg.getEntry()).length == 0){
    console.log(chalk.greenBright.bold("你输入的模块文件名不存在，请重新输入！\n"))
    return 
}
var hotConfig = [
    `webpack-dev-server/client?http://${webCfg.config.devServer}:${webCfg.config.port}`,
    'webpack/hot/dev-server'
]

// 主要是为了多入口 增加webpack-dev-server 打包到bundle.js 里 以inline的模式热更新
for(let item in config.entry){
    config.entry[item] = hotConfig.concat(config.entry[item])
}

var compiler = webpack(config);
let devServerConfig = {
    contentBase:'build/',
    publicPath:'/',
    compress:true,
    hot:true,
    noInfo:true,
    stats:'errors-only',
    host:'0.0.0.0',
}
var server = new webpackDevServer(compiler,devServerConfig)
server.listen(webCfg.config.port,'localhost')
