import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router/index.js";
import store from './store';
import "./assets/style/index.css";
//import { initMenu } from './untils/menu';
import "../src/assets/iconfont/iconfont.css";
Vue.use(ElementUI);
Vue.config.productionTip = false

// router.beforeEach((to,from,next)=>{
//   if(window.sessionStorage.getItem("token")){
//     initMenu(router,store);
//     next();
//   }else{
//     if(to.path == '/'){
//       next();
//     }
//   }
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
