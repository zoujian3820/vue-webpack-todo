module.exports = (isDev) => {
    return {
        preserveWhiteSpace: true,
        extractCSS: !isDev, //是否开启提取css文件
        cssModules: {
            //localIdentName把vue文件中写的类名，会根据文件路径、文件名加文件内容哈希值重新生成一个类名
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true //把vue文件中写的类名都改成驼峰的命名格式，就是用-链接的，会去掉-，并转化成单词字母大写的形式
        }
        // postcss:{} //外面已经定义了全局的postcss.config.js
        //hotReload: false //是否热重载,根据环境变量生成
    }
};