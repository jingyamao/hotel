<template>
  <div id="lrbanner">
    <router-view></router-view>
  </div>
</template>

<script>
import login from './login/login.vue'
export default {
    name: 'lrBanner',
    components:{
        login,
    },
    methods: {
        push(){
            this.$router.push({path:'/login'})
        }
    },
        mounted(){
            if (this.$route.path !== '/login') {
                this.push();
            }
        }
    }
</script>

<style lang="less" scoped>
    #lrbanner{
        margin:0;
        padding: 0;
        height: 100vh;
        overflow-y: hidden;
        background-image: url(../img/hotelbackground.jpg);
        background-size: 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items:center;
        justify-content: center;
    }
</style>