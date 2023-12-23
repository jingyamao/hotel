<template>
    <div id="body">
        <div class="title">
            注册账号
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item  label="账号" prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请输入账号,且账户名必须以大写字母C开头" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input  prefix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="ruleForm.password" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input prefix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="checkPass" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input prefix-icon="el-icon-user" placeholder="请输入姓名" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="sex" label="1" @change="handleGenderChange('男')">男</el-radio>
            <el-radio v-model="sex" label="2" @change="handleGenderChange('女')">女</el-radio>
          </el-form-item>
          <el-form-item  label="电话" prop="phone">
            <el-input prefix-icon="el-icon-phone-outline" placeholder="请输入电话号码" v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item  label="邮箱" prop="email">
            <el-input prefix-icon="el-icon-s-promotion" placeholder="请输入电子邮箱" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="success" @click="register">确定注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="push">返回登录</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'user_register',
    data() {
      var checkUser = (rule, value, callback) => {
        const userRegex = /^[A-Za-z0-9_.]{8,}$/;
        if (!value) {
          return callback(new Error('账号不能为空'));
        } else if (!userRegex.test(value)) {
          return callback(new Error('账号格式不正确,账号长度必须在8位以上,且只能包含字母数字下划线和点'));
        }
        callback();
      };

      var validatePass = (rule, value, callback) => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!passRegex.test(value)) {
          callback(new Error('密码格式不正确，必须包含字母和数字，且长度要在8位以上'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      var checkname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
        callback();
      };

      var checkphone = (rule, value, callback) => {
        const phoneRegex = /^1[3-9][0-9]{9}$/;
        if (!value) {
          return callback(new Error('电话不能为空'));
        } else if (!phoneRegex.test(value)) {
          return callback(new Error('电话号码格式不正确'));
        }
        callback();
      };

      var checkemail = (rule, value, callback) => {
        const emailRegex = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else if (!emailRegex.test(value)) {
          return callback(new Error('邮箱格式不正确'));
        }
        callback();
      };

      return {
        sex:'1',
        checkPass: '',
        ruleForm: {
          password: '',
          username: '',
          name:'',
          gender:'男',
          phone:'',
          email:'',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ],
          name: [
            { validator: checkname, trigger: 'blur' }
          ],
          phone: [
            { validator: checkphone, trigger: 'blur' }
          ],
          email: [
            { validator: checkemail, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
        handleGenderChange(gender) {
          this.ruleForm.gender = gender;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileSelect() {
          const selectedFile = this.$refs.fileInput.files[0];
          const previewImage = this.$refs.previewImage;

          if (selectedFile) {
            // 使用FileReader读取文件并在图像加载完成后更新图像预览
            const reader = new FileReader();

            reader.onload = function (e) {
              previewImage.src = e.target.result;
            };
            // 读取文件并触发onload事件
            reader.readAsDataURL(selectedFile);
          }
        },
        push(){
            this.$router.push({path:'/login'})
        },
        //注册函数
        async register() {
            //非空判断
            if (this.ruleForm.username === '' || this.ruleForm.password === ''||this.ruleForm.name === ''||this.ruleForm.phone ===''||this.ruleForm.email === '') {
              this.$message({
                message: '请将信息填写完整',
                type: 'warning',
                duration: 1000
              });
              return; // 不执行注册逻辑
            }else if(this.ruleForm.username.slice(0,1) !== "C"){
              this.$message({
                message: '账户名不合法,请以大写字母C开头',
                type: 'warning',
                duration: 1000
              });
              return;
            }

          try {
            // 使用 axios 发送包含文件和其他数据的 POST 请求
            const response = await axios.post('http://192.168.1.115:8080/client/register', this.ruleForm);

            console.log(response);
            // 处理服务器响应，可以根据需要执行相应的逻辑 response.data && response.data.success
            if (response.data.msg === '客户注册成功') {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000
              });
            } else {
              this.$message({
                message: '账户名已存在，请更改账户名称',
                type: 'error',
                duration: 1000
              });
            }
          } catch (error) {
            console.error('注册失败', error);
            this.$message({
              message: '注册失败，请检查当前网络设置',
              type: 'error',
              duration: 1000
            });
          }
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
        width: 50vw;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding-top: 40px;
        padding-right: 30px;
        padding-bottom: 20px;
        .title{
          text-align: center;
          padding-left:30px ;
          font-size: 20px;
          margin-bottom: 20px;
        }
        
        .headbanner{
        height: 80px;
        padding-left:20px;
        .header{
            width: 80px;
            height: 80px;
            overflow: hidden;
            cursor: pointer;
            margin: 0 auto;
            img{
                width: 80px;
                height: 80px;
                display: block;
                border-radius: 50%;
                border: 1px dashed #d9d9d9;
            }
            .el-upload{
                display: none;
                width: 80px;
                height: 80px;
            }
        }
    }
    }
    
    
    
</style>