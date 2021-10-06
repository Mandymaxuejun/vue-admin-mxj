const jsonServer = require('json-server')
const server = jsonServer.create()
const apiArr = require('./api')
const routes = require('./routes')

// 支持middleware
const middleware = jsonServer.defaults()
server.use(middleware)

//支持加载多个db json文件
const _ = require('underscore');
const path = require('path');
const fs = require('fs');
const { search } = require('core-js/fn/symbol')
const mockDir = path.join(__dirname,'data');
const base = {};
const files = fs.readdirSync(mockDir);
files.forEach(function(file){
    _.extend(base,require(path.resolve(mockDir,file)))
})

server.use(jsonServer.rewriter(routes))
const router = jsonServer.router(base);

apiArr.forEach(api => {
    api(server,router)
})

// 对请求数据进行处理;
server.use((req,res,next)=>{
    const token = req.headers.token
    const delay = 0;
    if(req.url.startsWith('/rest/')){
        req.url = req.url.replace('/rest/','/')
        setTimeout(() => {next(),delay})
        return
    }
    if(req.method === 'POST'){
        let name = req.url.substring(1);
        let db = router.db;
        let data = db.get(name).value();
        setTimeout(() => {res.jsonp(data)},delay);
        return;
    }else if(req.method === 'GET'){
        let qryObj = req.query;
        if(qryObj.pageNo && qryObj.pageSize){
            qryObj._page = qryObj.pageNo;
            qryObj._limit = qryObj.pageSize
        };
        // 匹配区间参数;
        for(let prop in qryObj){
            let gteProp = prop.replace(/(begin)|(from)|(start)$/i,'_gte')
            qryObj[gteProp] = qryObj[prop]
            let lteProp = prop.replace(/(end)|(to)$/i,'_lte')
            qryObj[lteProp] = qryObj[prop]
        }
    }
    setTimeout(() => {next()},delay);
})

server.use(router);

router.render = (req,res) => {
    const total = res.getHeader('X-Total-Count')
    if(total === undefined){
        res.jsonp({
            data:res.locals.data
        })
    } else {
        res.jsonp({
            data:res.locals.data,
            total:total
        })
    }
}

server.listen('9094',()=> {
    console.log('Json server is runnning');
})