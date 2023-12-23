<template>
  <div class="banner">
    <div class="title" style="color: red;">
        请谨慎修改订单信息
    </div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="订单号">
            <el-input v-model="ruleForm.id" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="房间号">
            <el-input v-model="ruleForm.rid" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="用户ID" >
            <el-input v-model="ruleForm.cid" size="small"></el-input>
        </el-form-item>
        <el-form-item label="房间类型"  >
            <el-input v-model="ruleForm.type" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="预约时间" >
            <el-input  v-model="ruleForm.time" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" >
            <el-input v-model="ruleForm.status" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button  @click="backadmin">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
    data() {
      return {
        ruleForm: {
            id:'',
            cid:'',
            rid: '',
            type: '',
            time: '',
            status: '',
        },
      };
    },
    methods: {
        backadmin(){
            this.$router.replace({path:'/admin/hotelorder'}).then(()=>{this.$router.go(0);})
        },
        //提交订单信息
        async submitForm() {
            try {
           
            //使用 axios 发送 POST 请求提交数据
            const response = await this.$axios.post('http://192.168.1.115:8080/admin/updateOrder', this.ruleForm,
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
                //console.error('提交失败', error);
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
      this.ruleForm.id = this.$route.query.id;
      this.ruleForm.cid = this.$route.query.cid;
      this.ruleForm.rid = this.$route.query.rid;
      this.ruleForm.type = this.$route.query.type;
      this.ruleForm.time = this.$route.query.time;
      this.ruleForm.status = this.$route.query.status;
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
        // height: 100px;
        .hbanner{
            margin: 0 auto;
            width: 550px;
            height: 100px;
            max-width: 50vw;
            display: flex; /* 使用 flex 布局 */
            justify-content: center; /* 在主轴上居中显示 */
            align-items: center; /* 在交叉轴上居中显示 */
        }
        .header{
            width: 150px;
            height: 100px;
            overflow: hidden;
            cursor: pointer;
            display: inline-block;
            margin-right: 30px;
            img{
                width: 100%;
                height: 100%;
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