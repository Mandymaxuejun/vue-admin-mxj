<template>
    <div>
        <!-- 最底层菜单 -->
        <template v-if="item.children && item.children.length === 0">
            <el-menu-item :key="item.id" :index="item.path">
                {{item.name}}
            </el-menu-item>
        </template>
        <!-- 父级菜单 -->
        <el-submenu v-else :index="item.id + ''" :key="item.id" style="text-align: left">
            <span slot="title">
                <i :class="item.iconCls"></i>
                {{item.name}}
            </span>
            <template v-for="child in item.children">
                <nav-menu v-if="child.children && child.children.length>0" :key="child.id" :item="child"/>
                <el-menu-item v-else :key="child.id" :index="child.path">
                <i :class="child.icon"></i>
                {{child.name}}
                </el-menu-item>
            </template>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name:'navMenu',
    props: {
        item:{
            type:Object,
            require:true
        }
    }
}
</script>