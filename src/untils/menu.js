import menuData from "./menu.json";
export const initMenu = (router,store) => {
    if(store.state.routes.length>0){
        return ;
    }
    let fmRouters = formatRoutes(menuData);
    router.addRoutes(fmRouters);
    store.commit('initRoutes',fmRouters);
}

export const formatRoutes = (routes) => {
    let fmtRouters = [];
    routes.forEach(router =>{
        let { id,path,component,name,iconCls,children } = router;
        if(children && children instanceof Array){
            children = formatRoutes(children);
        }
        let fmRouter = {
            id:id,
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){
                require(['../views/' + component + '.vue'],resolve);
            }
        }
        fmtRouters.push(fmRouter);
    })
    return fmtRouters;
}