<template>
        <div id="head">
            <div class="logo"></div>
                <div class="nav">
                    <ul>
                        <li><router-link class="nav-link" to="/front/home" active-class="active">首页</router-link></li>
                        <li><router-link class="nav-link" to="/front/detail_id" active-class="active">酒店房间</router-link></li>
                        <li><router-link class="nav-link" to="/front/order" active-class="active">我的订单</router-link></li>
                        <li><router-link class="nav-link" to="/front/person" active-class="active">个人中心</router-link></li>
                        <li><router-link class="nav-link" to="/front/myaccount" active-class="active">个人账单</router-link></li>
                    </ul>
                </div>
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
                            <el-dropdown-item ><span @click="backuser">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
                
            </div>
        </div>
</template>

<script>
export default {
    name:'uesrheader',
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
    },
    mounted() {
        //在挂载完成时发送GET请求获取当前用户
        this.$axios.get('http://192.168.1.115:8080/client/information',
            { 
              params:{
                  id:localStorage.getItem('id')
                },
              headers: {
                  "token":localStorage.getItem('token') 
              }
            }
        )
        .then((response) => {
          // console.log(response.data)
            if (response.data) {
                // 将获取到的数据
                this.avatarUrl = response.data.data.avatar;
                this.name = response.data.data.name;
            }
            // console.log(this.username);
        })
        .catch((error) => {
        //   console.log(132123,this.ruleForm.id)
        //     console.error('请求失败', error);  // 输出错误信息到控制台
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
#head{
    margin: 5px auto;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border-bottom: 1px solid #eee;
    .logo{
        float: left;
        width: 190px;
        height: 66px;
        background-image: url(../assets/hotel.png);
        background-size: cover;
    }
    .nav{
        float: left;
        flex-grow: 1; /* 占据剩余的空间，使 nav 部分能够伸缩 */
        height: 70px;
        overflow-x: auto;
        padding-left: 30px;
        ul {
            display: flex; 
            list-style: none; 
            margin: 0 auto;
            margin: 0;
            padding: 0;
            max-width: 800px; 
            width: 100%; /* 占满剩余空间 */
            margin: 0 auto; 
            justify-content: space-between;
            li {
                width: 120px;
                text-align: center;
                line-height: 66px;
                .nav-link {
                    // 添加你想要的自定义样式，比如取消默认样式的下划线
                    width: 120px;
                    display: inline-block;
                    text-decoration: none;
                    color: black;
                }
                .nav-link:hover{
                    // 添加你想要的自定义样式，比如取消默认样式的下划线
                    background-color: #2fb9c2;
                    color: white;
                }
                .nav-link.active {
                    // 选中时的样式
                    background-color:#2fb9c2;
                    color: white;
                }
            }
        }
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