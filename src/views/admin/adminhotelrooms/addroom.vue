<template>
  <div class="banner">
    <div class="title">
        添加房间信息
    </div>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="110px" class="demo-ruleForm" >
        <el-form-item label-width="0px">
          <div class="headbanner">
            <div class="hbanner">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="getUploadAction()"
                    :headers="uploadHeaders"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
                </el-upload>
                <!-- <div class="header" @click="triggerFileInput(0)">
                    <img ref="previewImage0" src="../../../assets/logo.png" alt="">
                    <input ref="fileInput0" type="file" class="el-upload" @change="handleFileSelect(0)">
                </div> -->
                <!-- <div class="header" @click="triggerFileInput(1)">
                    <img ref="previewImage1" src="../../../assets/logo.png" alt="">
                    <input ref="fileInput1" type="file" class="el-upload" @change="handleFileSelect(1)">
                </div>
                <div class="header" @click="triggerFileInput(2)">
                    <img ref="previewImage2" src="../../../assets/logo.png" alt="">
                    <input ref="fileInput2" type="file" class="el-upload" @change="handleFileSelect(2)">
                </div> -->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="房间号">
            <el-input v-model="ruleForm.rid" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="楼层">
            <el-input v-model="ruleForm.floor" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="房间类型" >
            <el-input v-model="ruleForm.type" size="small"></el-input>
        </el-form-item>
        <el-form-item label="可预约开始时间" >
            <el-input v-model="ruleForm.time1" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="可预约截止时间">
            <el-input  v-model="ruleForm.time2" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="房间价格">
            <el-input v-model="ruleForm.price" autocomplete="off" size="small"></el-input>
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
    name:'mycenter',
    data() {
      return {
        uploadHeaders: {},
        fileList: [],
        uploadCount: 1,
        ruleForm: {
          rid: '',
          floor: '',
          type:'',
          time1: '',
          time2: '',
          price: '',
        },
      };
    },
    mounted() {
        try {
            // 从本地存储中获取 token
            const token = localStorage.getItem('token');

            // 检查 token 是否存在
            if (token) {
            // 设置上传组件的请求头
            this.uploadHeaders = {'token': token };
            } else {
            console.error('Token not found');
            }
        } catch (error) {
            console.error('Error while getting token', error);
        }
    },
    methods: {
        getUploadAction() {
            return `http://192.168.1.115:8080/admin/common/uploadRoom${this.uploadCount}?rid=${Number(this.ruleForm.rid)}`;
            },
        handleSuccess(response, file) {
            // 文件上传成功的回调
            console.log('File uploaded successfully', response);
            
            // 上传成功后，增加 uploadCount
            if(this.uploadCount!==3){
                this.uploadCount += 1;
            }else{
                this.uploadCount =1;
                this.fileList=[];
                this.ruleForm.rid = '',
                this.ruleForm.floor = '',
                this.ruleForm.type = '',
                this.ruleForm.time1 = '',
                this.ruleForm.time2 = '',
                this.ruleForm.price = ''
            }
        },

        //传参回调
        submitUpload() {
            this.$refs.upload.submit();
        },


        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },

          //返回首页
        backadmin(){
            this.$router.replace({path:'/admin/roomadmin'}).then(()=>{this.$router.go(0);})
        },
   
        //提交房间信息
        async submitForm() {
            try {
            //使用 axios 发送 POST 请求提交数据
            const response = await this.$axios.post('http://192.168.1.115:8080/admin/room/add', 
            {
                rid:Number(this.ruleForm.rid),
                floor:Number(this.ruleForm.floor),
                type:this.ruleForm.type,
                time1:this.ruleForm.time1,
                time2:this.ruleForm.time2,
                price:Number(this.ruleForm.price),
            },
            {
                headers: {
                    'token':localStorage.getItem('token') 
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
        margin-top:20px;
        margin-bottom:20px ;
        .hbanner{
            
            margin: 0 auto;
            width: 550px;
            height: 100px;
            max-width: 50vw;
            display: flex; /* 使用 flex 布局 */
            justify-content: center; /* 在主轴上居中显示 */
            align-items: center; /* 在交叉轴上居中显示 */
        }
    }
}
</style>