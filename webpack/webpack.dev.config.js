const path = require('path')
const  {merge} = require('webpack-merge');
const resolve = dir=>path.resolve(__dirname,dir)
const webpackConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config  = require('./webpack.config.js')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
let conlg = [];
const entry = config.getEntry();
for(let item in entry){
    conlg.push(chalk.cyan.bold('your application is runnig here:')+ chalk.greenBright.bold(`http://${config.config.devServer}:${config.config.port}/${item}/`));
}
let debConfig = {
    entry:entry,
    output:{
        path:config.config.outPath,
        publicPath:config.config.publicPath,
        filename:'[name].[hash].js'
    },
    mode:'development',
    devtool:'source-map',
    watchOptions:{
        ignored:/node_modules/,
        aggregateTimeout:300,//防止重复保存 频繁重新编译，300ms内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    optimization:{
        minimize:false
    },
    // devServer:{
        // contentBase:path.join(__dirname,"../build"), //根目录
        // port:config.config.port,
        // host:config.config.devServer,
        // // 默认为true ，意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动二刷新页面，
        // //当为false 四， 网页自动刷新模式是iframe，将页面放在一个frame中
        // //这2种模式配置的方式和访问的路径稍微有点区别，
        // //最主要的区别还是Iframe mode是在网页中嵌入了一个iframe，将我们自己的应用注入到这个iframe当中去，因此每次你修改的文件后，都是这个iframe进行了reload。
        // inline:true,
        // hot:true,
        // open:true,
        // stats:'errprs-only',
        // compress:true,
        // noInfo:true,
        // before:(app)=>{
            
        // },
    // },
    plugins:[
        new CleanWebpackPlugin(['./build'],{
            verbose:false
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo:{
                messages:conlg
            }
        }),
        new webpack.DllReferencePlugin({
            context:path.resolve(config.config.outPath),
            manifest:require('../build/vendor-manifest.json')
        })
    ]
}

for(item in  entry){
   
    let templist = path.join(resolve('../src/app'),`/${item}/index.html`);
    if(!config.isFile(templist)){
        throw new Error('缺少页面主入口： index.html')
        templist = path.join(resolve('./app-template/index.html'))
    }
    debConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename:`${item}/index.html`,
            template:templist,
            inject:true,
            title:'平安租赁',
            host:config.config.distPath,
            prod:false,
            chunks:[item]
        })
    )
}

module.exports = merge(webpackConfig,debConfig)

