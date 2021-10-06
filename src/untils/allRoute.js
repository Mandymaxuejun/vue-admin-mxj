import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Layout from '../views/layout/Layout.vue';
import Page404 from '../views/pages/404.vue';

Vue.use(VueRouter)

// const routes = [
//     {
//         path:"/",
//         name:"Layout",
//         component:Layout
//     },
//     {
//         path:"/404",
//         name:"Page404",
//         component:Page404
//     },
//     {
//         path:"*",
//         redirect:"/404"
//     }
// ]

// const router = new VueRouter({
//     mode:'history',
//     base:process.env.BASE_URL,
//     routes
// })
// export default router
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
        },
        // {
        //     path:"/",
        //     component:Layout,
        //     children:[{
        //         name:"home",
        //         path:"home",
        //         component: resolve => require(['../views/pages/Home'], resolve),
        //         meta:{title:"首页",keepAlive:true}
        //     }]
        // },
        // {
        //     path:"/product",
        //     name:"product",
        //     component:Layout,
        //     redirect:"/product/List",
        //     children:[{
        //         name:"productList",
        //         path:"list",
        //         component:resolve => require(['../views/pages/product/List'],resolve),
        //         meta:{title:"商品管理",keepAlive:true}
        //     },{
        //         name:"productCategory",
        //         path:"category",
        //         component:resolve => require(['../views/pages/product/Category'],resolve),
        //         meta:{title:"类目管理",keepAlive:false}
        //     }]
        // },
        // {
        //     path:"/order",
        //     name:"order",
        //     component:Layout,
        //     redirect:"noRedirect",
        //     children:[{
        //         name:"orderList",
        //         path:"List",
        //         component:resolve => require(['../views/pages/order/List'],resolve),
        //         meta:{title:"订单管理",keepAlive:true}
        //     },{
        //         name:"orderNew",
        //         path:"orderNew",
        //         component:resolve => require(['../views/pages/order/New'],resolve),
        //         meta:{
        //             keepAlive:true,
        //             menuPath:"order/List",
        //             originalPath:"/order/List|/order/new",
        //             pathParam:"id",
        //             title:"新订单处理"
        //         }
        //     }]
        // },
        // {
        //     path:"/user",
        //     name:"user",
        //     component:Layout,
        //     redirect:"user/List",
        //     children:[{
        //         name:"userList",
        //         path:"List",
        //         component:resolve => require(['../views/pages/user/List'],resolve),
        //         meta:{title:"用户管理",keepAlive:true},
        //         children:[{
        //             name:"userView",
        //             path:"view/:id",
        //             component:resolve => require(['../views/pages/user/View'],resolve),
        //             meta:{
        //                 keepAlive:true,
        //                 menuPath:"/user/List",
        //                 pathParam:"id",
        //                 title:"用户查看"
        //             }
        //         }]
        //     }]
        // },
        // {
        //     path:"/process/starter",
        //     name:"processStarter",
        //     component:Layout,
        //     children:[{
        //         name:"processStarterView",
        //         path:"View",
        //         component: resolve => require(['../views/pages/process/starter/View'],resolve),
        //         meta:{title:"流程查看",keepAlive:true},
        //     }]
        // },
        // {
        //     path:"/process/starter/edit",
        //     name:"processStarterEdit",
        //     component:resolve => require(['../views/pages/process/starter/Edit'],resolve),
        //     meta:{title:"流程编辑",keepAlive:true,single:true}
        // }
    ]
})

const otherRoutes = [];
for(let i = 0;i<20;i++){
    const tail = i<10? '0' + i:''+i;
    otherRoutes.push({
        path:"/",
        component:Layout,
        children:[{ 
            name:'home' + tail,
            path:'/home' + tail,
            component:resolve => require(['../views/pages/Home'], resolve),
            meta:{title:"首页" + tail,keepAlive:true}
        }]
    })
}

router.addRoutes(otherRoutes);

router.afterEach((to)=>{
    if(to.meta.single) return;
    store.dispatch('addTag',{
        path:to.path,
        title:to.meta.title
    })
})

export default router