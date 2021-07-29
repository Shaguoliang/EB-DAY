module.exports = {
    publicPath: './',
    // publicPath: '',
    // publicPath: process.env.NODE_ENV === 'development' ? '/lyactivity/' : '/',
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui'],
        })
    },
    //vue-cli3.0 里面的 vue.config.js做配置
    devServer: {
        disableHostCheck: true,
        port:80
        // proxy: {
        //     '/eb': {     //这里最好有一个 /
        //         target: 'http://swapi.mcutec.com',  // 后台接口域名
        //         ws: true,        //如果要代理 websockets，配置这个参数
        //         secure: false,  // 如果是https接口，需要配置这个参数
        //         changeOrigin: true,  //是否跨域
        //         pathRewrite:{
        //             '^/eb':''
        //         }
        //     }
        // }
    }
}