/**
 * 1添加public/lib/Cesium
 * 2新建此文件,配置全局Cesium
 */
const webpack = require('webpack');

module.exports = {
    lintOnSave: false,
    devServer: {
        disableHostCheck: true
    },
    configureWebpack: () => {
        /* eslint-disable */
        plugins: [
            new webpack.ProvidePlugin({
                Cesium: 'Cesium',
                'window.Cesium': 'Cesium',
                'Cesium': 'Cesium',
            })
        ]
    }
};