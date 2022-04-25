/**
 * 1添加public/lib/Cesium
 * 2新建此文件,配置全局Cesium
 */
const webpack = require('webpack');

// const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";

module.exports = {
    // publicPath: BASE_URL,

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