<template>
  <div>
    <div class="header">
        <userheader/>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import userheader from '../../components/userheader.vue'
export default {
    components:{
        userheader
    }
}
</script>

<style>
    
</style>