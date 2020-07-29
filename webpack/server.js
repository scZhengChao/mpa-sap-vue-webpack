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
console.log()
var compiler = webpack(config);
let devServerOptions  = {
    contentBase:'build/',
    publicPath:'/',
    compress:true,
    watchOptions:{
        ignored:/node_modules/,
        aggregateTimeout:300,//防止重复保存 频繁重新编译，300ms内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    hot:true,
    noInfo:true,
    stats:'errors-only',
    host:'127.0.0.1',
    https: false,
    open:true,
    openPage: Object.keys(config.entry),
    overlay: {
        errors: true
    },
    port:8080,
    proxy:{

    }
}
var server = new webpackDevServer(compiler,devServerOptions )
server.listen(webCfg.config.port,'127.0.0.1')
