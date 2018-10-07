const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer()
        // require('autoprefixer')({ //package.json中设置了browserslist，则不用设置browsers
        //     browsers: ['last 10 versions','Firefox >= 20','Android >= 4.0','iOS >= 8']
        // })
    ]
};