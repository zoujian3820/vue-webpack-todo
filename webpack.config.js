const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV || 'production',
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: ['vue-style-loader', 'css-loader']
            // },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({template: './src/index.html'}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ]
}

if (isDev) {
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    });
    //用于开发时，调试代码的工具，在页面中debug;时可以看到项目写的代码，而不是编译后的代码
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8009,
        host: '0.0.0.0', //此种设置，可以支持 localhost / 127.0.0.1 / 局域网id访问(ipconfig)
        overlay: {
            errors: true
        },
        open: true, //会在运行npm run dev时自动打开浏览器
        // historyFallback: {},

        // hot：防止在单页应用开发时，修改了某个组件的代码，导致整个页面都发生渲染，
        // 设置了后，则只会渲染当前的组件,搭配HotModuleReplacementPlugin插件使用，实现页面热加载更新
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl(us)?$/,
            use: ExtractPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    );
    config.plugins.push(
        new ExtractPlugin('styles.[chunkhash:8].css')
    )
}

module.exports = config;