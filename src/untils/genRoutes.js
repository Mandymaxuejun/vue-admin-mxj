import Layout from "../views/layout/Layout"

export default function genRoutes (permissions) {
    /*
    * configMap保存路由配置对象,key为菜单id;
    * permissonMap保存权限菜单数据,key为id，value为权限菜单;
    * routes保存生成的路由定义;
    */ 
    let configMap = {}
    let permissionMap = {}
    let routes = []
    permissions.forEach((p,i) => {
        // 保存权限菜单数据到map
        permissionMap[p.id] = p
        // 如果没有配置component就直接返回,进行下一个迭代;
        if(!p.component) return
        if(p.single) {
            routes.push({
                name:p.name,
                path:p.path,
                component:resolve => require(["../views.pages" + p.component],resolve),
                meta: {
                    title:p.title,
                    keepAlive:p.keepAlive !== false,
                    single:true
                }
            })
            return
        }
        //取得父级菜单的path,如果本身就是一级菜单,路径设置为/
        let config 
        const parent = permissionMap[p.pid]
        let parentPath = p.pid === 0 ? '/' : parent.path
        // 如果是叶子菜单选项;
        if(p.isMenu){
            // 如果父菜单的路由
            if(!configMap[p.pid]){
                // 配置父菜单的路由,组件指定为布局组件;
                config = {
                    path:parentPath,
                    component:Layout,
                    children:[]
                }
                if(parent){
                    //增加父路由的菜单的配置;
                    config.name = parent.name
                    if(parent.redirect){
                        config.redirect = parent.redirect
                    }
                }
                configMap[p.pid] = config
                // 添加到路由定义数组中;
                routes.push(config)
            }
            // 获取父路由配置对象;
            config = configMap[p.pid]
            // 子路由配置对象,注意path为省略父path的那部分;
            let subConfig = {
                name:p.name,
                path:p.path.replace(parentPath+'/',''),
                component:resolve => require(["../views/pages/" + p.component],resolve),
                meta:{
                    title:p.title,
                    keepAlive:p.keepAlive !== false
                },
                children:[]
            }
            // 在父路由配置对象的children中添加当前子路由;
            config.children.push(subConfig)
            //保存菜单的路由设置;
            configMap[p.id] = subConfig
        }else {//否则就是权限节点;
            // 获取父路由设置
            let pid = p.pid;
            if(p.parentPath){
                pid = permissions.filter(o => o.path === p.parentPath)[0].id
            }
            config = configMap[pid]
            let matches = p.path.match(/\/:(\S+)$/);
            const pathParam = matches && matches[i];
            config.children.push({
                name:p.name,
                path:p.path.replace(parentPath + '/',''),
                component:resolve => require(["../views/pages/" + p.component],resolve),
                meta:{
                    title:p.title,
                    keepAlive:p.keepAlive !== false,
                    menuPath:parentPath,
                    pathParam,
                    originalPath:p.originalPath
                }
            })
        }
    })
    return routes
}