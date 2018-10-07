# vue-webpack-todo
### 初步构建的环境，可以正常跑起来了
* cross-env为支持多端在package.json scripts中运行赋值命令:
    >     npm install cross-env --save-dev
    
    >     "build": "cross-env NODE_ENV=production webpack --config webpack.config.js"
* 添加了HotModuleReplacementPlugin热加载功能，在devtool中设置hot: true
* 支持vue jsx写法，依赖以下库
    >     {
    >         test: /\.jsx$/,
    >         loader: 'babel-loader
    >     }  
    
    >     npm install --save-dev "babel-helper-vue-jsx-merge-props
    
    >     npm install --save-dev babel-loader
    
    >     npm install --save-dev babel-plugin-syntax-jsx
    
    >     npm install --save-dev babel-plugin-transform-vue-jsx
* 扩展webpack.config.base.js的配置需要下载 webpack-merge 插件   
    >     npm install --saev-dev webpack-merge
* 打包时删除旧的包文件夹dist，可用rimraf 插件
    >     npm install --save-dev rimraf
    
    ######     在 package.json > scripts字段中添加如下命令：
    >     "scripts": {
    >       "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.config.client.js",
    >       "build": "npm run clear && npm run build:client",
    >       "build2": "npm run clear && cross-env NODE_ENV=production webpack --config build/webpack.config.client.js",
    >       "clear": "rimraf dist"
    >     }
    
    >     然后运行 npm run build 即先运行 npm run clear，再运行 npm run build:client