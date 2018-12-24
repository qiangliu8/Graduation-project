const path = require('path')
const webpack = require('webpack')
const HtmlWbpackPlugins = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    entry:'./src/index.js',
    mode:'development',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'vendor.js',
    },
    resolve:{
        modules:[
            path.resolve('src'),
            path.resolve('node_modules')// 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ]
    },
    module:{
        rules:[    
            {
                test: /\.(sass|scss|css)$/,
                use: [
                        {
                        loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader","sass-loader"
                  ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'assets/[name].[ext]',
                            publicPath: '../'
                        },
                    }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/[name].[ext]'
                        }
                }]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader?cacheDirectory',
                    options:{
                        presets:["env","react","stage-2"],
                        plugins: ["transform-decorators-legacy"]
                    }
                },
                include: path.resolve(__dirname, './src')
            }
        ]
    },
    plugins:[
        new HtmlWbpackPlugins({template:'./src/index.html'}),
        new MiniCssExtractPlugin({
            filename: "scss/[name].css",
            chunkFilename: "[id].css"
          }),
        // new webpack.optimize.SplitChunksPlugin({
        //     chunks: "all",
        //     minSize: 20000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     name: true
        // }),
    ],
    devServer:{
        contentBase : path.join(__dirname,'dist'),
        compress : true,         //使用gizp压缩
        port : 8086,
        hot: true,
        inline: true,
        historyApiFallback:true,
        proxy: {
            '/': {
                target: "http://localhost:8087",
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
    performance: {
        hints:false
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'initial', // 只对入口文件处理
    //         cacheGroups: {
    //             vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
    //                 test: /node_modules\//,
    //                 name: 'page/vendor',
    //                 priority: 10,
    //                 enforce: true
    //             },
    //             commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
    //                 test: /common\/|components\//,
    //                 name: 'page/commons',
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     },
    //     runtimeChunk: {
    //         name: 'page/manifest'
    //     }
    // },
}