const ora = require('ora');
const webpack = require('webpack')
const fs = require('fs-extra');
let webpackConfig = require('./webpack.prod.config.js')
const config = require('./webpack.config.js')
const entry = config.getEntry();
const chalk = require('chalk');

if(Object.keys(entry).length == 0){
    console.log(chalk.greenBright.bold(`你输入的模块文件名 ${process.argv[2]}有误，请重新输入`))
    return 
}

var spinner = ora({
    color:'red'
})
spinner.start(chalk.greenBright.bold("building for production..."));

webpack(webpackConfig,function(err,stats){
    if(err) throw new Error(err)
    spinner.succeed(chalk.greenBright.bold('build success  !'))
    
    process.stdout.write(stats.toString({
        colors: true,
        modules: false, //去掉内置模块信息 
        children: false, //去掉子模块 
        chunks: false, //增加包信息（设置为 false 能允许较少的冗长输出
        chunkModules: false, //去除包里内置模块的信息      
    }))
    // // 禁止 webpack 生成文件
    // if(fs.statSync(config.config.outPath).isDirectory()){
    //     // 遍历build,及其子目录 下的文件
    //     fs.readdirSync(config.config.outPath).forEach((file,i)=>{
    //         // 遍历你要打包的 文件
    //         for(let item of config.config.clientItem){
    //             let from = config.config.outPath + '\\' + file;
    //             let to = config.config.outPath + `\\${item}\\${file}`;
    //             if(file.indexOf(`${item}.`)>-1){
    //                 fs.move(from.replace(/[\\]/g,'/'),to.replace(/[\\]/g,'/'))
    //             }
    //             if(file.indexOf(`${item}-assets`)>-1){
    //                 fs.move(from.replace(/[\\]/g,'/'),to.replace(/[\\]/g,'/'))
    //             }
    //         }
    //     })
    // }
})