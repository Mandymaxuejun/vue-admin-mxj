<template>
    <div class="menu">
        <template v-for="menu in data">
            <template v-if="!menu.children || menu.children.length===0">
              <el-menu-item :index="menu.path" :key="menu.id">
                    <template v-if="menu.icon">
                        <i :class="[menu.icon,{iconfont:menu.icon && menu.icon.startsWith('icon-')}]"></i>
                        <span slot="title">{{menu.title}}</span>
                    </template>
                    <template v-else>
                        {{menu.title}}
                    </template>
              </el-menu-item>
            </template>
            <template v-else>
                <el-submenu :index="menu.path" :key="menu.id">
                    <template slot="title">
                        <template v-if="menu.icon">
                            <i :class="[menu.icon,{iconfont:menu.icon && menu.icon.startsWith('icon-')}]"></i>
                            <span slot="title">{{menu.title}}</span>
                        </template>
                        <template v-else>
                            {{menu.title}}
                        </template>
                    </template>
                    <Menu :data="menu.children">
                    </Menu>
                </el-submenu>
            </template>
        </template>
    </div>
</template>
<script>
export default {
    name:'Menu',
    props:{
        data:[Array],
    },
    data(){
        return{
     
        }
    }
}
</script>
<style scoped>
.menu .iconfont {
    margin-right:5px;
    width:24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}
</style>