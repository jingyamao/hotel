<template>
  <div class="banner">
    <div class="title" style="color: red;">
        请谨慎修改该用户信息
    </div>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label-width="0px">
            <div class="headbanner">
                <div class="header" >
                    <!-- <img ref="previewImage" src="../../../img/hotelbackground.jpg" alt=""> -->
                    <img ref="previewImage" :src="this.avatarUrl" alt="">
                </div>
            </div>
        </el-form-item>
        <el-form-item label="账号">
            <el-input v-model="ruleForm.username" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="ruleForm.password" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" >
            <el-input v-model="ruleForm.gender" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
            <el-input  v-model="ruleForm.phone" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
            <el-input v-model="ruleForm.status" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="账户余额" prop="balance">
            <el-input v-model="ruleForm.balance" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="失约次数" prop="miss">
            <el-input v-model="ruleForm.miss" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button  @click="backadmin">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
    name:'mycenter',
    data() {
      return {
        avatarUrl: '', // 头像URL
        id:'',
        ruleForm: {
          username:'',
          password:'',
          phone: '',
          email: '',
          name: '',
          gender:'',
          status:'',
          balance:'',
          miss:''
        },
      };
    },
    methods: {
          backadmin(){
            this.$router.replace({path:'/admin/useradmin'}).then(()=>{this.$router.go(0);})
          },
        //提交个人信息
        async submitForm() {
            try {
            //使用 axios 发送 POST 请求提交数据
            const response = await this.$axios.post('http://192.168.1.115:8080/admin/client/update', 
            {
              id:Number(this.id),
              username:this.ruleForm.username,
              password:this.ruleForm.password,
              phone:this.ruleForm.phone,
              email:this.ruleForm.email,
              gender:this.ruleForm.gender,
              status:Number(this.ruleForm.status),
              balance:Number(this.ruleForm.balance),
              miss:Number(this.ruleForm.miss)
            },
                {
                    headers: {
                        'token': localStorage.getItem('token') // 添加 Authorization 头携带 token
                    }
                }
            );
            console.log('提交成功', response.data);
            //可以在这里处理其他逻辑，例如跳转或显示成功消息
            //显示成功提示
            this.$message({
                        message: '提交成功',
                        type: 'success',
                        duration: 1000
                    });
            } catch (error) {
                 console.error('提交失败', error);
                // 可以在这里处理其他逻辑，例如显示错误消息
                // 显示成功提示
                this.$message({
                        message: '提交失败',
                        type: 'error',
                        duration: 1000
                    });
            }
        },
    },
    mounted() {
      // 更新组件数据
      

      this.id = this.$route.query.id;
      this.ruleForm.username = this.$route.query.username;
      this.avatarUrl = this.$route.query.avatarurl;
      this.ruleForm.name = this.$route.query.name;
      this.ruleForm.phone = this.$route.query.phone;
      this.ruleForm.email = this.$route.query.email;
      this.ruleForm.password = this.$route.query.password;
      this.ruleForm.balance = this.$route.query.balance;
      this.ruleForm.status = this.$route.query.status;
      this.ruleForm.gender = this.$route.query.gender;
      this.ruleForm.miss = this.$route.query.miss;

    },

}
</script>

<style lang="less" scoped>
.banner{
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    padding-right: 50px;
    width: 60vw;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .title{
      text-align: center;
      padding-left:30px ;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .headbanner{
        height: 100px;
        .header{
            width: 100px;
            height: 100px;
            overflow: hidden;
            cursor: pointer;
            margin: 0 auto;
            img{
                width: 100px;
                height: 100px;
                display: block;
                border-radius: 50%;
                border: 1px dashed #d9d9d9;
            }
            .el-upload{
                display: none;
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>