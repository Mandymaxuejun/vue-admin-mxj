<template>
    <el-scrollbar ref="sc" wrap-class="v-scrollbar-wrapper" class="v-scroll">
        <el-menu
            :default-active="$route.meta.menuPath || $route.path"
            class="left-menu"
            background-color="#304151"
            text-color="#bfcbd1"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse-transition="false"
            :collapse="sidebar.isCollapsed"
            router>
            <Menu :data="menuData"></Menu>
        </el-menu>
    </el-scrollbar>
</template>
<script>
import Menu from './Menu';
import menu from '../../../untils/menu.json';
import {mapGetters} from 'vuex';
export default {
    name:'Sidebar',
    components:{Menu},
    computed:{
        ...mapGetters([
            'sidebar'
        ])
    },
    data () {
        return {
           menuData:[]
        }
    },
    watch: {
        $route () {
            this.$nextTick(()=>{
                this.autoScroll();
            })
        }
    },
    mounted () {
        window.addEventListener('resize',this.autoScroll);
        this.$nextTick(()=>{
            this.autoScroll();
        })
        // for(let i = 0;i<20;i++){
        //     const tail = i<10 ? '0' + i :'' + i;
        //     menu.push({
        //         "name":"home" + tail,
        //         "icon":"icon-shouye",
        //         "path":"/home" + tail,
        //         "title":"首页" + tail,
        //         "isMenu":true,
        //         "keepAlive":true,
        //         "component":"Home"
        //     })
        // }
        this.menuData = menu;
    },
    destroyed () {
        window.removeEventListener('resize',this.autoScroll);
    },
    methods:{
        autoScroll () {
            const sw = this.$refs.sc.$refs.wrap;
            if(!document.querySelector('.el-menu-item.is-active')){
                return;
            }
            const el = document.querySelector('.el-menu-item.is-active');
            const rect = el.getBoundingClientRect();
            const top = rect.top;
            const height = window.innerHeight;
            const t1 = top;
            const t2 = el.clientHeight + top;
            if (t2 <= height && t1>=0){
                return;
            }
            if(t2 >height){
                const maxScroll = sw.scrollHeight - height;
                const canScroll = t2 - (height + el.clientHeight) / 2;
                sw.scrollTop += Math.min(canScroll,maxScroll);
            }else{
                const canScroll = height * 0.5 - el.clientHeight *0.5 - t1;
                if(canScroll <= sw.scrollTop){
                    sw.scrollTop -= canScroll;
                }else{
                    sw.scrollTop = 0;
                }
            }
        }
    }
}
</script>
<style scoped>
.left-menu{
    border:none;
    user-select: none;
}
.left-menu .menu{
    overflow: hidden;
}
</style>