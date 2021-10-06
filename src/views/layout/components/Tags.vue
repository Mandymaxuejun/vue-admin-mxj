<template>
    <div class="page-tags-container">
        <div class="tag-wrapper">
            <div class="tag" :ref="$route.path.startsWith(tag.path)?'actTag':null"
                :class="{active:$route.path.startsWith(tag.path)}"
                @click="select(tag.path)" v-for="(tag,index) in pageTags" :key="index">
                <span>{{tag.title}}</span>
                <i v-show="pageTags.length>1" class="el-icon-close" @click.stop="close(tag.path)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'Tags',
    computed:{
        ...mapGetters(['pageTags'])
    },
    data () {
        return {

        }
    },
    methods:{
        select (path) {
            if(this.$route.path === path) return
            this.$router.push({
                path
            })
        },
        close (path) {
            this.$store.dispatch('removeTag',path);
            //判断当前删除的是否为active的tag
            if(this.$route.path === path) {
                let nextPath
                if(this.pageTags.length > 0){
                    nextPath = this.pageTags[this.pageTags.length - 1].path
                }else{
                    nextPath = "/"
                }
                this.$router.push({
                    path:nextPath
                })
            }
        }
    }
}
</script>
<style scoped>
.page-tags-container{
    position: relative;
    color:#495060;
    height:34px;
    z-index: 9;
    line-height:34px;
    background:#fff;
    padding: 3px 1px 1px 1px;
    font-size:12px;
    border-bottom:1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12),0 0 3px rgba(0,0,0,.04);
}
.page-tags-container .tag-wrapper{
    position: relative;
    line-height: 30px;
    background:#fff;
}
.page-tags-container .tag{
    height:28px;
    line-height: 28px;
    border:1px solid #ccc;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
    padding:0 6px;
    user-select: none;
    margin:0 1px;
    background:#fff;
    color:#000;
}
.page-tags-container .tag.active{
    background-color:#409eff;
    color:#fff;
    border:1px solid #409eff;
}
</style>