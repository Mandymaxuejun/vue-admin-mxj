<template>
    <div class="layout-wrapper" :class="{collapsed:sidebar.isCollapsed}">
        <el-container>
            <!-- <el-aside width="200px">
                <sidebar></sidebar>
            </el-aside> -->
            <el-aside :style="{'width':sidebar.isCollapsed?'64px':'200px'}">
                <sidebar></sidebar>
            </el-aside>
            <el-main :style="{'margin-left':sidebar.isCollapsed?'64px':'200px'}">
                <navbar></navbar>
                <tags></tags>
                <page-container></page-container>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import {Sidebar,Navbar,Tags,PageContainer} from './components';
import {mapGetters} from 'vuex';
export default {
    name:'Layout',
    components:{Sidebar,Navbar,Tags,PageContainer},
    computed:{
        ...mapGetters(['sidebar'])
    },
    data () {
        return {

        }
    }
}
</script>
<style scoped>
.layout-wrapper{
    position: relative;
    background:#304151;
    height: 100%;
    overflow-y: auto;
}
.el-container{
    height:100%;
}
.el-container .el-aside{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    background:#304151;
    color: #bfcbd1;
    transition:width 0.28s;
}
.el-container .el-main{
    height: 100%;
    overflow-y: auto;
    margin-left:200px;
    padding:0;
    background:#f0f2f5;
    transition:margin-left 0.28s;
}
</style>