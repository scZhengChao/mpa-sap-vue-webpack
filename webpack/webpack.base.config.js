const path = require('path');
const config = require('./webpack.config.js');
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const _version = new Date().getTime()

module.exports = {
    resolve:{
        alias:{
            '@':path.join(__dirname,"..","src"),
            '@a':path.join(__dirname,"..","src/app"),
        },
        modules:['node_modules','.'],
        extensions:['.ts','.tsx','.js','.jsx','.json','.vue']
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    config.config.vueLoader,
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            },
            {
                test:/.less$/,
                use:[
                    config.config.vueLoader,
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader'
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    config.config.vueLoader,
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'sass-loader'
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    transformAssetUrls:{
                        video:['src','poster'],
                        source:'src',
                        img:'src',
                        image:'xlink:href',
                        audio:'src'
                    },
                    compilerOptions:{
                        preserveWhitespace:false
                    }
                }
            },
            {
                test:/\.(mp3)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name(file){
                                return `${file}-assets/[name].${_version}.[ext]`;
                            }
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        plugins:['@babel/plugin-proposal-class-properties']
                    }
                },
                exclude:/node_modules/,
                include:path.join(process.cwd(),'./src')
            },
            {
                test:/\.(gif|png|jpe?g|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name(file){
                                if(file.indexOf('pc') != -1 || file.indexOf('app') != -1){
                                    file = file.replace(/\\/g,'/')
                                    let fle = file.replace(/.+src\/\S{1,3}\/|\/.+/g,"");
                                    return `${fle}-assets/[name].${_version}.[ext]`;
                                }else{
                                    return `${config.config.clientItem.join('')}-assets/[name].${_version}.[ext]`
                                }
                            },
                            limit:1024*16,
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        outputPath:'',
                    }
                }
            }
        ]
    },
    plugins:[
        new webpack.NoEmitOnErrorsPlugin(),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_APP':JSON.stringify(process.env.NODE_APP)
        })
    ]
}