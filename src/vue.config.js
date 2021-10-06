let proxyObj = {}
proxyObj['/'] = {
    ws:false,
    target:"http://localhost:8081",
    changeOrigin:true,
}
module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:8081
    }
}