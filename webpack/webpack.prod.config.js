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
const entry = config.getEntry()
const _version = new Date().getTime()
const BundlAnanlyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
let debConfig = {
    entry:entry,
    output:{
        publicPath:'',
        filename:`[name].${_version}.js`
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
            filename:`[name].${_version}.css`,
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
    debConfig.output.path =path.resolve(__dirname,`../build/${item}`)
    let templist = path.join(config.config.root,`./src/${entry[item].replace(/^.+src\/|\/.+$/g,'')}/${item}/index.html`);
    if(!config.isFile(templist)){
        templist = path.join(config.config.root,`./webpack/${entry[item].replace(/^.+src\/|\/.+$/g,'')}-template/index.html`)
    }
   
    // 此处循环添加htmlwebpackplugins 的主要目的为了多入口多出口 https://blog.csdn.net/D_Z_Yong/article/details/102891802
    debConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:templist.replace(/\\/g,'/'),
            inject:true,
            title:'平安租赁',
            host:config.config.distPath,
            prod:true,
            module:`${item}.${_version}`,
            hash:true,
            //选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。
            // 那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
            //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
            chunks:[item],
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