<template>
    <div>
        <div>User List</div>
        <router-link to="/user/list/view/1">uer/view</router-link>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            direction="rtl"
            :before-close="handleClose">
            <span>我来啦!</span>
            <router-view></router-view>
        </el-drawer>
    </div>
</template>
<script>
export default {
    name:"UserList",
    data () {
        return {
            drawer: false,
        }
    },
    watch:{
        '$route.path':function (newVal) {
            if(newVal.startsWith("/user/list/view")){
                this.drawer = true;
            }else{
                this.drawer = false;
            }
        }
    },
    methods:{
        handleClose(){
            this.drawer = false;
            console.log('关闭路由');
        }
    }
}
</script>
<style scoped>
</style>