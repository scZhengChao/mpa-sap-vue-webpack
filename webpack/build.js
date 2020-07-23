const ora = require('ora');
const webpack = require('webpack')
const fs = require('fs-extra');
// let webpackConfig = require('./webpack.prod.config.js')
const config = require('./webpack.config.js')
const entry = config.getEntry();
const chalk = require('chalk')

if(Object.keys(entry).length == 0){
    console.log(chalk.greenBright.bold(`你输入的模块文件名 ${process.argv[2]}有误，请重新输入`))
    return 
}
var spinner = ora({
    color:'red'
})
spinner.start(chalk.greenBright.bold("building for production..."));
