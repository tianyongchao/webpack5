

const { path, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// npm i css-loader style-loader -D      npm i url-loader file-loader -D
// npm i mini-css-extract-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// npm i optimize-css-assets-webpack-plugin -D
  
// 设置node.js环境变量
process.env.NODE_ENV = 'development'
module.exports = {
    target: 'web',
    // 入口文件
    entry: './src/index.js',

    // 输出

    output: {
        //输出文件名
        filename: 'built.js',

        // 输出路径

        path: resolve(__dirname, 'build')
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
    mode: 'development',

    // 开发服务器 npx webpack-dev-server
    devServer:{
        contentBase: resolve (__dirname, 'build'),
        compress: true,
        port: 1234,
        open: true
    }

}