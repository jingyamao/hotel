<template>
    <div id="body">
        <div class="title">
            请修改订单信息
        </div>
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="房间号:" prop="rid">
                <el-input  placeholder="请输入房间号" v-model="ruleForm.rid"></el-input>
            </el-form-item>
            
            <el-form-item label="房间类型:" prop="type">
                <el-input  placeholder="请输入房间类型" v-model="ruleForm.type"  ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">提交</el-button>
                <el-button @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
        </el-form>  
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'login',
    data() {
    
      return {
        id:'',
        ruleForm: {
          type: '',
          rid: '',
        },
      };
    },
    methods: {
        resetForm() {
            this.$router.push({path:'/front/order'})
        },
         
      async login() {
        const response = await this.$axios.post(`http://192.168.1.115:8080//client/order/update`, 
                {
                    id: this.id,
                    rid: this.ruleForm.rid,
                    type:this.ruleForm.type
                },{
                headers: {
                  'token': localStorage.getItem('token')
                },
            });
        if(response.data.code == 200){
            this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
          }
        }
  },
  mounted() {
     this.id = this.$route.query.id;
     this.ruleForm.rid = this.$route.query.rid;
     this.ruleForm.type = this.$route.query.type;
    // 获取其他参数

    // 然后可以使用这些参数进行操作
},

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

