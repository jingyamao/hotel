<template>
    <div>
        <div class="header">
            <adminheader/>
        </div>
        <div class="body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import adminheader from '../../components/adminheader.vue'
export default {
    components:{
        adminheader
    }
}
</script>

<style lang="less" scoped>
    .body{
        height: 80vh;
        margin-left: 205px;
        margin-top: 100px;
    }
</style>