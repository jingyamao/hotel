<template>
  <div class="banner">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label-width="0px">
            <div class="headbanner">
                <div class="header" @click="triggerFileInput">
                    <img ref="previewImage" :src="this.avatarUrl" alt="">
                    <input ref="fileInput" type="file" class="el-upload" @change="handleFileSelect">
                </div>
            </div>
        </el-form-item>
        <el-form-item label="账号">
            <el-input v-model="username" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="userpassword" autocomplete="off" :disabled="true" show-password size="small" style="max-width: 200px;"></el-input>
            <el-button type="primary" @click="password" style="margin-left: 20px;" size="small">修改密码</el-button>
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
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
    name:'mycenter',
    data() {
      var checkname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } 
        callback();
      };
      var validateemail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } 
        callback();
      };
      var validategender = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入性别'));
        } 
        callback();
      };
      return {
        username:'',
        userpassword:'',
        avatarUrl: '', // 头像URL
        ruleForm: {
          phone: '',
          email: '',
          name: '',
          gender:'',
          status:''
        },
        rules: {
          phone: [
            { validator: validatephone, trigger: 'blur' }
          ],
          email: [
            { validator: validateemail, trigger: 'blur' }
          ],
          name: [
            { validator: checkname, trigger: 'blur' }
          ],
          gender: [
            { validator: validategender, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
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
        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        //修改密码
        async password() {
            try {
                // 弹出窗口用户输入新密码
                const { value } = await this.$prompt('请输入新密码', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'password',
                });
                //用户点击确定按钮后向服务器发送POST请求传输新密码
                const response = await this.$axios.post('http://192.168.1.115:8080/admin/update', 
                    { 
                      id:localStorage.getItem('id'),
                      password: value 
                    },
                    {
                      headers: {
                          'token': localStorage.getItem('token') // 添加 Authorization 头携带 token
                        }
                    }
                );

                    // 判断服务器的响应结果，根据需要执行相应的逻辑response.data && response.data.success
                    if (response.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                    });
                    } else {
                    this.$message({
                        type: 'error',
                        message: '操作失败',
                    });
                    }
                } catch (error) {
                    console.error('获取当前密码或修改失败', error);
                    this.$message({
                    type: 'error',
                    message: '操作失败',
                  });
              }
            },
            //上传头像
            async uploadAvatar() {
              try {
                const formData = new FormData();
                formData.append('file', this.$refs.fileInput.files[0]); // 添加头像文件

                // 使用 axios 发送 POST 请求提交头像
                await this.$axios.post(`http://192.168.1.115:8080/admin/information/?id=${Number(localStorage.getItem('id'))}`, formData, 
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.getItem('token')
                  }
                });

                // 头像上传成功，可以在这里执行其他逻辑

              } catch (error) {
                console.error('头像上传失败:', error);
                this.$message({
                  message: '头像上传失败，请稍后重试',
                  type: 'error',
                  duration: 1000
                });
              }
            },
        //提交个人信息
        async submitForm() {
            try {
            // 如果用户选择了新头像，先上传头像
            if (this.$refs.fileInput.files[0]) {
              await this.uploadAvatar();
            }
            //使用 axios 发送 POST 请求提交数据
            const response = await this.$axios.post('http://192.168.1.115:8080/admin/update',
                {
                    id:localStorage.getItem('id'),
                    name:this.ruleForm.name,
                    gender:this.ruleForm.gender,
                    phone:this.ruleForm.phone,
                    email:this.ruleForm.email
                },
                {
                    headers: {
                        'token': localStorage.getItem('token')
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
      //在挂载完成时发送GET请求获取当前用户的账号密码
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
              // 将获取到的账号和密码赋值给对应的数据属性
              this.username = response.data.data.username;
              this.userpassword = response.data.data.password;
              this.avatarUrl = response.data.data.avatar;
              this.ruleForm.name = response.data.data.name;
              this.ruleForm.phone = response.data.data.phone;
              this.ruleForm.email = response.data.data.email;
              this.ruleForm.status = response.data.data.status;
              this.ruleForm.gender = response.data.data.gender;
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
.banner{
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    padding-right: 50px;
    width: 60vw;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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