const path = require('path')
const webpack = require('webpack');
const config = require('./webpack.config.js')
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig,{
    entry:{
        vendor:[
            'vue',
            'vuex',
            'vue-router',
            'axios'
        ]
    },
    mode:'production',
    output:{
        path:path.resolve(config.config.outPath),
        filename:'[name].dll.js',
        library:'[name]_library',
        publicPath:'/build/'
    },
    plugins:[
        new webpack.DllPlugin({
            path:path.join(config.config.outPath,'[name]-manifest.json'),
            name:'[name]_library',
            context:path.resolve(config.config.outPath)
        })
    ]
})
