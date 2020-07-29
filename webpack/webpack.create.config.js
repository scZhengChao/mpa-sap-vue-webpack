const config = require('./webpack.config.js')
const inquirer = require('inquirer')
const chalk = require('chalk');
const fs = require('fs-extra');

let clientItem = process.argv[2]; // 包名称
let entryPath = config.config.root + '\\src\\app\\' + clientItem;
let fromFile = config.config.root + '\\webpack\\app-template\\';
fromFile = fromFile.replace(/[\\]/g,'/');
entryPath = entryPath.replace(/[\\]/g,'/');

if(!clientItem){
    console.log(chalk.greenBright.bold('请输入模块名称！\n 例：npm run create demo'))
    return 
}
if(fs.pathExistsSync(entryPath)){
    console.log(chalk.greenBright.bold('你输入的模块在pc文件已存在！'))
    return
}

inquirer.prompt([
    {
        type:'confirm',
        name:'create',
        message:`确认创建${clientItem}模块`,
        default:true
    }
]).then(e=>{
    if(e.create){
        fs.mkdir(entryPath)
        fs.copy(fromFile,entryPath,function(e){
            console.log(chalk.greenBright.bold(`模块创建成功 启动模块： npm run dev ${clientItem}`))
        })
    }
})