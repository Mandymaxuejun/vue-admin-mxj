import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Layout from '../views/layout/Layout.vue';
import Page404 from '../views/pages/404.vue';
import genRoutes from "../untils/genRoutes";
import {tree2list} from "../untils/treeUtil";
import menuData from "../untils/menuMock.json";


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path:'/',
            name: 'Layout',
            component: Layout,
            redirect:'home'
        },
        {
            path:'/404',
            name:'Page404',
            component:Page404
        },
        {
            path:"*",
            redirect:"/404"
        }
    ]
})

const list = tree2list(menuData,'children');
router.addRoutes(genRoutes(Object.assign([],list)));

router.afterEach((to)=>{
    // 如果是登录页面什么都不做;
    if('Page404,login'.split(',').indexOf(to.name)>=0) return;
    if(to.meta.single) return;
    store.dispatch('calcNavpath',{
        path: to.meta.originalPath || to.path,
        pathParam: to.meta.pathParam //包含的路径参数;
    })
    store.dispatch('addTag',{
        path:to.path,
        title:to.meta.title
    })
})

export default router