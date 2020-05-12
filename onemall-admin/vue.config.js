const path = require('path')
function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在vue中此loader之后，运行
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule.include.add(resolve('src/icons'))
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })

        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        imagesRule.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    }
}