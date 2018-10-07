/*
* 依赖webpack.config.base.js
* */

const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');//合并webpack配置工具
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new VueLoaderPlugin(),

    /*
     * htmlWebpackPlugin
     * 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件
     * 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
     * */
    new htmlWebpackPlugin({
        template: path.join(__dirname, '../client/index.html')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    })
];

const devServer = {
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

let config;

if (isDev) {
    /*
    * 利用webpack-merge合并webpack配置，且不会改动webpack.config.base.js文件的配置
    * 不用手动一个个去push进去，会直接把当前添加的配置，直接合到base里面去，并重新返回一个新的配置
    * */
    config = merge(baseConfig, {
        //devtool用于开发时，调试代码的工具，在页面中debug;时可以看到项目写的代码，而不是编译后的代码
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        // {
                        //     loader: 'css-loader',
                        //     options: {
                        //         module: true,
                        //         localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                        //     }
                        // },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js')

            // vendor: ['vue','vue-router']
            // vendor实现类库文件单独打包，如vue 、vue-router等库会单独打包成单个文件 （要配合new webpack.optimize.CommonsChunkPlugin插件使用）
            // 由于webpack4.0 废弃了webpack.optimize.CommonsChunkPlugin，用optimization.splitChunks.chunks替代，
            // all表示所有从node_modules中引入的库，都会打包成单个文件
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: ExtractPlugin.extract({ //ExtractPlugin（extract-text-webpack-plugin）插件实现css文件单独打包成单个文件
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            // {
                            //     loader: 'css-loader',
                            //     options: {
                            //         importLoaders: 1
                            //     }
                            // },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true //实现webapck相关配置代码单独打包，用于此类文件可以让浏览器缓存
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[chunkhash:8].css')//,实现css文件单独打包成单个文件
            // 实现js类库文件单独打包, webpack4.0已经废弃，请用optimization.splitChunks
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor'
            // }),

            //实现webapck相关配置代码单独打包、放在vendor后面，webapck4.0已经废弃，请用optimization.runtimeChunk替代
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'runtime'
            // })
        ])
    });
}

module.exports = config;