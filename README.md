# vue-webpack-todo
### 初步构建的环境，可以正常跑起来了
* cross-env为支持多端在package.json scripts中运行赋值命令:
    > npm install cross-env --save-dev
    
    > "build": "cross-env NODE_ENV=production webpack --config webpack.config.js"
* 添加了HotModuleReplacementPlugin热加载功能，在devtool中设置hot: true