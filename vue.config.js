const path = require("path")

function resolve(url) {
    return path.resolve(__dirname, url)
  }
module.exports = { 
    // baseUrl:"/maizuo/",
    devServer :{
        port:8080,
        proxy:{
            "/mg":{
                target:"http://movie.miguvideo.com",
                pathRewrite:{"^/mg":""}
            },
            "/mz":{
                target:"https://m.maizuo.com",
                pathRewrite:{"^/mz":""}
            },
            "/bd":{
                target:"http://api.map.baidu.com",
                pathRewrite:{"^/bd":""}
            },
            // "/api":{
            //     target:"http://localhost:3000",
            //     pathRewrite:{"^/api":""}
            // }
        },
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@style', resolve('src/stylesheets'))
            .set('@c',resolve('src/components'))
            .set('@libs',resolve('src/libs/'))
            .set("@page",resolve("src/pages"))
            .set("@util",resolve("src/util"))
            .set('@img',resolve('public/images/'))
            .set('@store',resolve('src/store/'))
            .set('@assets',resolve('src/assets'))

    }
}