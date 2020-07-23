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
    ` webpack-dev-server/client?http://${webCfg.config.devServer}:${webCfg.config.port}`,
    'webpack/hot/dev-server'
]