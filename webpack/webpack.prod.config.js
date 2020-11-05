const path = require('path')
const {merge} = require('webpack-merge')
const webpackConfig = require('./webpack.base.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const webpack = require('webpack')
const entry = config.getEntry()

const BundlAnanlyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
let debConfig = {
    entry:entry,
    output:{
        publicPath:'',
        filename:`[name].${config._version}.js`  //name 是对entry中条目key的引用
    },
    devtool:'inline-source-map',
    mode:'production',
    optimization:{
        minimizer:[
            new UglifyJsPlugin({ 
                cache: true, //是否启用文件缓存
                parallel: true,// 多进程提高构建速度
                sourceMap: false,
                uglifyOptions:{
                    warnings:false,//删除无用代码时不输出警告
                    output:{
                        comments:false,//删除所有注释
                        beautify:false //最紧凑的输出，不保留空格和制表符
                        
                    },
                    compress:{
                        drop_console: true, //删除所有console语句，可以兼容IE
                        collapse_vars: true, //内嵌已定义但只使用一次的变量
                        reduce_vars: true, //提取使用多次但没定义的静态值到变量
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            //filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            //chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
            filename:`[name].${config._version}.css`,
        }),
        new ParallelUglifyPlugin({
            uglifyJS:{
                output:{
                    comments:false
                },
                compress:{
                    // warnings:false,
                    'drop_debugger':true,
                    'drop_console':true
                }
            }
        })
    ]
}
const argv = JSON.parse(process.env.npm_config_argv)

let clearBuild = [];

for(item in entry){
    clearBuild.push(`${item}/*`)
}
debConfig.plugins.push(
    new CleanWebpackPlugin(
        clearBuild,
        {
            root:config.config.outPath,
            verbose:false,
            dry:false
        }
    )
)
argv.original.includes('--report') && debConfig.plugins.push(
    new BundlAnanlyzerPlugin({
        analyzerMode:argv.original.includes('--static')?'static':'server',
        analyzerHost:'127.0.0.1',
        analyzerPort:'9999',
        reportFilename:'report.html',
        defaultSizes:'parsed',
        openAnalyzer:true,
        statsFilename:'stats.json',
        statsOptions:null,
        logLevel:'info'
    })
)

module.exports = merge(webpackConfig,debConfig)