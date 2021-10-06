import {tree2list} from "../../untils/treeUtil";
import menuData from "../../untils/menuMock.json";
const layout = {
    state:{
        sidebar:{
            isCollapsed:false//左侧菜单是否折叠，默认是打开状态;
        },
        navBar:{
            navPath:[]//路径导航中保存的路径数组;
        },
        tags:[]
    },
    mutations:{
        TOGGLE_SIDEBAR:state => {
            state.sidebar.isCollapsed = !state.sidebar.isCollapsed
        },
        // 计算导航路径;
        CALC_NAVPATH:(state,obj) => {
            let path = obj.path
            if(path === '/'){
                state.navBar.navPath = []
                return
            }
            const permissionMap = tree2list(menuData,'children');
            const tail = path.split('|')[1] || ''
            path = path.split("/")[0]
            const arr = path.split('/')
            let temp = ''
            let result = []
            for(let i = 1;i<arr.length;i++){
                if(!tail && obj.pathParam && i === arr.length -1) break
                temp += '/' + arr[i]
                result.push(permissionMap[temp])
            }
            if(tail) result.push(permissionMap[tail])
            state.navBar.navPath  = result
        },
        ADD_TAG:(state,tag) => {
            if(state.tags.filter(t=>t.path === tag.path).length===0){
                state.tags.push(tag);
            }
        },
        REMOVE_TAG:(state,path) => {
            const index = state.tags.findIndex(t => t.path === path)
            state.tags.splice(index,1)
        },
        CLEAR_TAGS:(state) => {
            state.tags = []
        }
    },
    actions:{
        toggleSidebar({commit}){
            commit('TOGGLE_SIDEBAR')
        },
        calcNavpath ({commit},obj) {
            commit('CALC_NAVPATH',obj)
        },
        addTag({commit},tag) {
            commit('ADD_TAG',tag)
        },
        removeTag({commit},path) {
            commit('REMOVE_TAG',path)
        },
        clearTags ({commit}) {
            commit('CLEAR_TAGS')
        }
    }
}
export default layout