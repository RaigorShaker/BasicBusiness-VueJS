// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
console.log('path is:' + path.resolve(__dirname, '../machine/index.html'))
module.exports = {
    build: {
        env: {NODE_ENV: '"production"'},
        index: path.resolve(__dirname, '../goods/index.html'),
        assetsRoot: path.resolve(__dirname, '../goods'),
        assetsSubDirectory: 'release/static',
        assetsPublicPath: './',//assetsPubicPath + assetsSubDirectory
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {NODE_ENV: '"development"'},
        port: 8888,//可配置
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        context: [ //代理路径git 
            // 'http://localhost:8888/api/item/goodsCoupon/couponList'
        ],
        // proxyTable: {
        //     '/api/item/goodsCoupon/couponList':{
        //         target:'http://wyhw-test.banyan-data.com/wyhw',
        //         changeOrigin:true,
        //         // pathRewrite:{
        //         //     '^/api/item/goodsCoupon/couponList':'/item/goodsCoupon/couponList'
        //         // }
        //     }
        // },
        // proxypath: 'http://www.cninfo.com.cn/cninfo-new/announcement/query?stock=601318',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}