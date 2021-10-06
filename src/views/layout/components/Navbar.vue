<template>
    <div class="navbar">
        <span class="collapse" @click="toggle">
            <i class="iconfont icon-weibiaoti"></i>
        </span>
        <router-link class="link-icon" to="/">
            <i class="iconfont icon-home"></i>
        </router-link>
        <el-breadcrumb class="navpath" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(p, index) in navpath" :key="p.id">
                <router-link class="nav-link" v-if="index < navpath.length - 1 && p.component" :to="p.path">
                   {{p.title}}
                </router-link>
                <span class="nav-text" v-else>{{p.title}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'Navbar',
    computed: {
        ...mapGetters([
            'navpath'
        ])
    },
    data () {
        return {
           
        }
    },
    methods:{
        toggle(){
            this.$store.dispatch('toggleSidebar')
        }
    }
}
</script>
<style scoped>
.navbar{
    height:50px;
    line-height:50px;
    background:#fff;
    border-bottom:1px solid #E6E6E6;
}
.navbar .collapse{
    display: inline-block;
    height: 50px;
    padding: 0;
    cursor: pointer;
}
.navbar .collapse:hover{
    background:#eee;
}
.navbar i{
    font-size:20px;
    padding: 12px;
}
.navbar .navpath{
    display: inline-block;
    user-select: none;
}
.navbar .navpath .nav-link{
    font-weight: 400;
}
.navbar .navpath .nav-text{
    color:#999;
}
</style>