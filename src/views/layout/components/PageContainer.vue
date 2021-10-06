<template>
    <div class="page-container">
        <div class="page-wrapper">
            <div class="page-content">
                <!-- 路由缓存的配置方案实现 -->
                <keep-alive>
                    <router-view class="page-content" v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view class="page-content" v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'PageContainer',
    data () {
        return {

        }
    }
}
</script>
<style scoped>
.page-container{
    position: relative;
    height:calc(100% - 106px);
    background:#f0f2f5;
    margin: 0 12px;
    padding-top:12px;
}
.page-container .page-wrapper{
    position: absolute;
    width:100%;
    height:calc(100% - 24px);
}
.page-container .page-wrapper .page-content{
    padding:12px;
    background: #fff;
    margin-bottom: 12px;
}
</style>