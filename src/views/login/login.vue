<template>
    <div id="body">
        <div class="title">
            欢迎光临你好酒店
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号:" prop="user">
                <el-input prefix-icon="el-icon-user " placeholder="请输入账号" v-model="ruleForm.username"></el-input>
            </el-form-item>
            
            <el-form-item label="密码:" prop="pass">
                <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="ruleForm.password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="success" @click="pushzhuce">去注册</el-button>
            </el-form-item>
        </el-form>  
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'login',
    data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        callback();
      };
    
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        pushzhuce(){
            this.$router.push({path:'/user_register'})
        },
        replaceuserhead(){
            this.$router.replace({path:'/front/home'})
        },
        replaceadminhead(){
            const currentRoute = this.$router.currentRoute;
            // 检查是否要替换为相同的路由
            if (currentRoute.path !== '/admin') {
              this.$router.replace('/admin');
            }
        },
         
      // login() {
      //       // // 非空判断
      //       // if (this.ruleForm.user === '' || this.ruleForm.pass === '') {
      //       //   this.$message({
      //       //     message: '账号和密码不能为空',
      //       //     type: 'warning',
      //       //     duration: 1000
      //       //   });
      //       //   return; // 不执行登录逻辑
      //       // }
      //       try {
      //           // const response =  axios.post('http://192.168.1.117:8080/login',this.ruleForm);
      //           // //处理登录成功的逻辑
      //           // console.log('登录成功', response);
      //           //this.replaceadminhead();
      //           this.replaceuserhead();
      //           // 显示成功提示
      //           this.$message({
      //                   message: '登录成功',
      //                   type: 'success',
      //                   duration: 1000
      //               });
      //           } catch (error) {
      //               // // 处理登录失败的逻辑
      //               // console.error('登录失败', error);
      //               // // 显示错误提示
      //               this.$message({
      //                   message: '登录失败，用户名或密码错误',
      //                   type: 'error',
      //                   duration: 1000
      //               });
                    
      //           }
      //   },
      login() {
              // 非空判断
              if (this.ruleForm.username === '' || this.ruleForm.password === ''){
                this.$message({
                  message: '账号和密码不能为空',
                  type: 'warning',
                  duration: 1000
                });
                return; // 不执行登录逻辑
              }
          axios.post('http://192.168.1.115:8080/user/login', this.ruleForm)
              .then(response => {
                  // 处理成功登录
                  console.log('登录成功', response);
                  if(response.data.code === 200 && response.data.msg === "客户账号登录成功"){
                    const userData = response.data.data;
                    // 存储token
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('id', userData.id);
                    // // 使用全局事件总线 (Vue.prototype) 存储 id
                    // this.$root.$emit('userIdChanged', userData.id);

                    // 显示成功提示
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 1000
                    });
                    this.replaceuserhead();
                  }else if(response.data.code === 200 && response.data.msg === "管理员账号登录成功"){
                      const adminData = response.data.data;
                      // 存储token
                      localStorage.setItem('token', adminData.token);
                      localStorage.setItem('id', adminData.id);
                      // // 使用全局事件总线 (Vue.prototype) 存储 id
                      // this.$root.$emit('adminIdChanged', adminData.id);

                      // 显示成功提示
                      this.$message({
                          message: '管理员登录成功',
                          type: 'success',
                          duration: 1000
                      });
                      this.replaceadminhead();
                  }else{
                      this.$message({
                        message: '登录失败，用户名或密码错误',
                        type: 'error',
                        duration: 1000
                    });
                  }
              })
              .catch(error => {
                  // 处理登录失败
                  console.error('登录失败', error);
                  // 显示错误提示
                  this.$message({
                      message: '登录失败，用户名或密码错误',
                      type: 'error',
                      duration: 1000
                  });
              });
         }
  }

}
</script>

<style lang="less" scoped>
    #body{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding-top: 40px;
        padding-right: 50px;
        padding-bottom: 20px;
    }
    .title{
        padding-left:55px ;
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
    }

</style>>

