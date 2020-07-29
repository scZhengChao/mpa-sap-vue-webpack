const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob')
const TARGET = process.env.npm_lifecycle_event;

// 文件名 （并没有server）
const clientItem = {
    dev:process.argv[2],
    server:process.argv[5],
    build:process.argv[2]
};


const vueLoader = {
    dev:'vue-style-loader',
    build:MiniCssExtractPlugin.loader,
    dll:MiniCssExtractPlugin.loader
};
const resolve = dir=>path.resolve(__dirname,dir)

//获取本机ip
const getIPAdress = ()=>{
    var interfaces = require('os').networkInterfaces();
    let IPV4 = null
    Object.values(interfaces).flat().forEach(item=>{
        if(item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal){
            if(IPV4) return
            IPV4 = item.address
        }
    })
    return IPV4
}

// 基本配置
const config = {
    root:resolve('../'),
    entry:resolve('../src/app/'),
    publicPath:'/',
    outPath:resolve('../build'),
    devServer:'localhost',
    port:'9006',
    distPath:'',
    vueLoader:vueLoader[TARGET],
    clientItem:clientItem[TARGET] && clientItem[TARGET].toString().replace('/[,，=]/',',').split(','), //支持开启多个‘,’ 分割
    target:TARGET
}

//文件是否存在
const isFile = v =>fs.pathExistsSync(v)

//获取webpack entry 入口 包名和对应的js主入口
const getEntry = ()=>{
    let entryObj = {}
    if(!config.clientItem) throw new Error('没有找到对应入口')
    config.clientItem.forEach(item=>{
        let file = glob.sync(resolve(`../src/app/${item}/index.js`)).toString()
        isFile(file)?entryObj[item] = file:entryObj={}
    })
    return entryObj
}
module.exports = {
    getEntry,
    config,
    isFile,
    getIPAdress
}

