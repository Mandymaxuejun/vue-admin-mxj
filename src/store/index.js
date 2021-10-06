// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex);

// export default new Vuex.Store({
//     state:{
//         routes:[]
//     },
//     mutations:{
//         initRoutes(state,data){
//             state.routes = data;
//         }
//     }
// })
import Vue from 'vue';
import Vuex from 'vuex';
import layout from './modules/layout';
import getters from './getters';

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        layout
    },
    getters
})
export default store