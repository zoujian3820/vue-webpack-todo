/*
*   所有webapck都要用到的，公共配置都放在这里
*   开发环境、正式环境、后期要加入的服务端渲染--的配置都要依赖此文件
 */

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV || 'production',
    target: "web",
    entry: path.join(__dirname, '../src/index.js'),
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
            // {
            //     test: /\.js$/, //node_modules中的文件都是已经编绎过的，所以要排除exclude,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]' //让生成的静态文件按项目本身的结构生成，加上文件路径即可 resources/[path]
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;