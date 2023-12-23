<template>
    <div>
        <div class="head">
            <div class="logo"></div>
            <h1>
                <i class="el-icon-s-flag" style="color: #2fb9c2"></i>
                    酒 店 管 理 系 统
                <i class="el-icon-s-flag" style="color: #2fb9c2"></i>
            </h1>
            <div class="user">
                    <el-dropdown >
                        <div class="avatar-dropdown-wrapper">
                            <img :src="this.avatarUrl" alt="">
                            <div>
                                <span class="el-dropdown-link">
                                    {{ this.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                            </div>
                            
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><span @click="gocenter">个人中心</span></el-dropdown-item>
                            <el-dropdown-item ><span @click="goaddadmin">新增管理员</span></el-dropdown-item>
                            <el-dropdown-item ><span @click="backuser">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-col :span="24">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#f0f0f0"
                text-color="black"
                active-text-color="#2fb9c2"
                :router='true'
                style="width: 200px; position: fixed; height: 100vh; left: 0; top: 0; padding-top: 75px;">
                    <el-menu-item index="/admin/home">
                        <i class="el-icon-menu"></i>
                        <span slot="title" style="width: 200px; display:inline-block">
                            管理员须知
                        </span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户管理</span>
                        </template>
                            <el-menu-item-group>
                                <el-menu-item index="/admin/useradmin">客户信息</el-menu-item>
                            </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>酒店房间管理</span>
                        </template>
                            <el-menu-item-group>
                                <el-menu-item index="/admin/roomadmin">房间信息</el-menu-item>
                                <el-menu-item index="/admin/addroom">增加房间</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>酒店业务管理</span>
                        </template>
                            <el-menu-item-group>
                                <el-menu-item index="/admin/hotelorder">查看订单</el-menu-item>
                                <el-menu-item index="/admin/hotelmoney">查看酒店资产</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    data(){
        return{
            avatarUrl:'',
            name:''
        }
    },
    methods: {
        backuser(){
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this.$router.replace({path:'/login'})
        },
        gocenter(){
            const currentRoute = this.$router.currentRoute;
            // 检查是否要导航到相同的路由
            if (currentRoute.path !== '/admin/admincenter') {
            this.$router.push('/admin/admincenter');
            }
        },
        goaddadmin(){
            const currentRoute = this.$router.currentRoute;
            // 检查是否要导航到相同的路由
            if (currentRoute.path !== '/admin/register') {
            this.$router.push('/admin/register');
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
        
    },
    mounted() {
      //在挂载完成时发送GET请求获取当前用户的数据
      this.$axios.get('http://192.168.1.115:8080/admin/information',
          {
            params:{
                  id:localStorage.getItem('id')
                },
            headers: {
                'token':localStorage.getItem('token') // 添加 Authorization 头携带 token
            }
          }
      )
      .then((response) => {
          console.log(response.data)
          if (response.data) {
              // 将获取到
              this.avatarUrl = response.data.data.avatar;
              this.name = response.data.data.name;
          }
      })
      .catch((error) => {
          console.error('请求失败', error);  // 输出错误信息到控制台
          // 显示错误提示
          this.$message({
              message: '获取用户信息失败，请检查网络设置',
              type: 'error',
              duration: 1000
          });
      });
    },
}
</script>

<style lang="less" scoped>
.head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border-bottom: 1px solid #eee;
    z-index: 1000; /* 设置一个较大的 z-index，确保头部在上层 */
    background-color: #fff;
    .logo {
        margin-left: 5px;
        width: 190px;
        height: 66px;
        background-image: url(../assets/hotel.png);
        background-size: cover;
    }
    h1{
        color: #2fb9c2;
    }
    .user{
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: flex-end; 
        height: 70px; /* 通过设置高度，使内部元素在垂直方向上居中 */
        width: 200px;
        // padding-right: 20px;
        .avatar-dropdown-wrapper {
            display: flex;
            align-items: center;
            justify-content: right; 
            height: 70px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            div{
                margin-left: 10px;
            }
        }
    }
}
</style>
  