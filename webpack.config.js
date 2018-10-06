const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
            },
            {
                test: /.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ]
}

if (isDev) {
    //用于开发时，调试代码的工具，在页面中debug;时可以看到项目写的代码，而不是编译后的代码
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8009,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        open: true,
        // historyFallback: {},

        // hot：防止在单页应用开发时，修改了某个组件的代码，导致整个页面都发生渲染，
        // 设置了后，则只会渲染当前的组件,搭配HotModuleReplacementPlugin插件使用，实现页面热加载更新
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config