

const { path, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// npm i css-loader style-loader -D      npm i url-loader file-loader -D
// npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// npm i optimize-css-assets-webpack-plugin -D

// babel缓存 cacheDirectory：true
// 设置node.js环境变量  development
let environment = 'development'
process.env.NODE_ENV = environment
module.exports = {
    target: 'web',
    // 入口文件
    entry: ['./src/index.js', './src/index.html'],
    // 输出

    output: {
        //输出文件名
        // filename: 'js/[name].built.[contenthash]js',
        filename: 'js/[name].js',

        // 输出路径

        path: resolve(__dirname, 'build'),

        // 所有资源引入的公共路径前缀
        // publicPath: './',

        // 非入口chunk的名称
        chunkFilename: '[name]_chunk.js',

        // libraryTarget: 'commonjs'

        // library: '[name]',  // 全局整个库向外暴露的变量名

        // libraryTarget: 'window'   //  变量添加到哪个browser   node为global

    },
    // Loader配置
    module: {
        rules: [
            // 匹配那些文件
            {
                test: /\.css$/,
                 // 使用那些loader处理
                use: [
                    //  创建style标签，将js中的样式资源插入进行，添加到header中生效
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,  //提取js中的css成单独文件
                    {
                        loader: 'postcss-loader',
                        options: {
                            indent: 'postcss',
                            plugins: () => [
                                require ('postcss-preset-env')()
                            ]
                        }
                    },
                    // 将css文件变成common.js模块加载在js文件中，里面内容是字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 24,
                    // html-loader使用commonjs      url-loader使用的es6  解析时候出问题 <img src="[object Module]" alt="">
                    esModule: false,
                    // ext 文件原名
                    // 哈希
                    // name: '[hash: 10].[ext]'
                }

            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 打包其他资源（除了html、css/js）
                // exclude: /\.(css|js|html|less|json)$/,
                // loader: 'file-loader'
            }
        ]
    },

    //plugins 的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],

    // 模式
    mode: environment,

    // 解析模块规则
    resolve:{
        // 配置路径别名
        alias:{
            $css: resolve(__dirname, 'src/css')
        },
        //配置省略文件领的后缀名
        extensions: ['.js', 'json']
    },
    // 开发服务器 npx webpack-dev-server
    devServer:{
        contentBase: resolve (__dirname, 'build'),
        compress: true,
      //  忽略文件
        watchOptions: {
            ignored: '/node_modules/'
        },
        port: 8201,
        hot: true,
        open: true,
        watchContentBase: true,  // 监视contentBase 下所有的文件。一旦有变化就会reload
        clientLogLevel: 'none' , //不显示启动服务器的日日志信息
        overlay: false,
        // quiet: true   // 除了基本的启动信息，其他内容都不要打印
        proxy: {
            'api': {
                target: '',
                // 路径重写  将/api/xxx   -->   /xxx （去掉api）
                pathRewrite: {
                    '^api': ''
                }
            }
        }
    },
    devtool: 'source-map'
}