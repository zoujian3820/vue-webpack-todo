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