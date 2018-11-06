const path = require("path")

function resolve(url) {
    return path.resolve(__dirname, url)
  }
module.exports = { 
    devServer :{
        port:8080,
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@style', resolve('src/stylesheets'))
            .set('@c',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('@img',resolve('public/images/'))
            .set('@libs',resolve('public/libs/'))
            .set("@page",resolve("src/pages"))
    }
}