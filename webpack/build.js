const ora = require('ora');
const webpack = require('webpack')
const fs = require('fs-extra');
let webpackConfig = require('./webpack.prod.config.js')
const config = require('./webpack.config.js')
const entry = config.getEntry();
const chalk = require('chalk');
const _ = require('lodash')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

if(Object.keys(entry).length == 0){
    console.log(chalk.greenBright.bold(`你输入的模块文件名 ${process.argv[2]}有误，请重新输入`))
    return 
}

var spinner = ora({
    color:'red'
})
spinner.start(chalk.greenBright.bold("building for production..."));

let itemArr = Object.keys(entry)

itemArr.forEach(item=>{
    let configWebpack = _.cloneDeep(webpackConfig)
    configWebpack.entry = {
        [item]:entry[item]
    }


    configWebpack.output.path =path.resolve(__dirname,`../build/${item}`)
    let templist = path.join(config.config.root,`./src/${entry[item].replace(/^.+src\/|\/.+$/g,'')}/${item}/index.html`);
    if(!config.isFile(templist)){
        templist = path.join(config.config.root,`./webpack/${entry[item].replace(/^.+src\/|\/.+$/g,'')}-template/index.html`)
    }
   
    // 此处循环添加htmlwebpackplugins 的主要目的为了多入口多出口 https://blog.csdn.net/D_Z_Yong/article/details/102891802
    configWebpack.plugins.push(
        new HtmlWebpackPlugin({
            filename:'index.html', //   相对于output.path
            template:templist.replace(/\\/g,'/'), //输入文件的相对根目录所在的目录；这个地方为绝对路径
            inject:true,
            title:'平安租赁',
            host:config.config.distPath,
            prod:true,
            module:`${item}.${config._version}`,
            hash:true,
            //选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。
            // 那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
            //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
            chunks:[item],  //代表指定的入口文件是哪个
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true, 
                html5:true,
                minifyJS:true,
                minifyCSS:true,
                minifyURLs:true,
                removeComments:true,
                removeEmptyAttributes:true,
            }
        })
    )

    webpack(configWebpack,function(err,stats){
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
})
