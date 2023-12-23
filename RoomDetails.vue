<template>
  <div class="roomd">
    <div class="top"> 
      <h2 class="header">房间详情</h2>
    </div>
    <div  class="banner">
      <div class="showpict">
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="item in roomData.picture" :key="item">
            <img
              :src="item"
              alt="Room Image"
              style="width: 100%; height: 350px"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="showdeta">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <div>
                <h3>房间信息</h3>
                <p style="margin-bottom: 10px;">房间号: {{ roomData.rid }}</p>
                <p style="margin-bottom: 10px;">房间类型：{{ roomData.type }}</p>
                <p style="margin-bottom: 10px;">楼层: {{ roomData.floor }}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <h3>洗浴用品</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >牙刷</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >沐浴露</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >牙膏</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >洗发水</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >香皂</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >护发素</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >梳子</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >剃须刀</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <h3>卫浴设施</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >浴室</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >卫生间</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >拖鞋</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >吹风机</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >毛巾</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >24H热水</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >浴巾</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >淋浴</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <h3>客房设施</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >空调</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电动窗帘</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >鸭绒被</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >毛毯</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <h3>媒体科技</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电视机</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >智能门锁</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电影服务</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >智能客控</i
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="bottom">
            <el-col :span="4">
            <div class="grid-content bg-purple">
              <div class="pri">价格￥：{{ this.roomData.price }}/晚</div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <div style="margin-top: 35px">
                <el-button type="success" @click="ordersuccess()">立即预定</el-button>
              </div>
            </div>
            </el-col>
        </div>
        </el-row>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
      const {rid,floor,type,time1,time2,picture1,picture2,picture3,price,} = this.$route.params;
      // 更新组件数据
      this.roomData.rid = rid;
      this.roomData.floor = floor;
      this.roomData.type = type;
      this.roomData.time1 = time1;
      this.roomData.time2 = time2;
      this.roomData.picture = [
        picture1,
        picture2,
        picture3,
      ]
      
      this.roomData.price = price;
    },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value1: "",
      value2: "",
      dialogFormVisible: false,
      paymentDialogVisible: false,

      roomData: {
        rid:'',
        floor:'',
        type:'',
        time1:'',
        time2:'',
        type:'',
        picture:[],
        price:'99999$'
      },
    };
  },
  methods: {
        //预定函数
        ordersuccess() {
          this.fetchServer(),
          this.$message({
            message: "预定成功",
            type: "success",
            duration: 1000,
          });
        },
         
        async fetchServer(){
              axios.post(
          "http://192.168.1.115:8080/client/room/book",
          {
            cid: localStorage.getItem('id'),
            rid: this.roomData.rid,
            type: this.roomData.type,
          },
          {
            headers: {
              "token": localStorage.getItem('token'),
            },}
                )
                .then((response) => {
                  // 在这里处理成功的响应
                  console.log("预定成功：", response.data);
                  // 这里可以添加成功后的操作，比如提示用户注册成功
                })
                .catch((error) => {
                  // 在这里处理错误的响应
                  console.error("预定失败：", error);
                  // 这里可以添加错误处理，比如提示用户注册失败
                });
            },
          },
}
     
</script>

<style lang="less" scoped>
.top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: -25px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    color: #2fb9c2;
    .header{
      margin: 0 auto;
    }
}

.showdeta{
    h3{
      color: #2fb9c2;
    }
    p{
      color: black;
    }
}
.roomd {
  width: 80%;
  margin: auto;
}





.banner{
  margin-top: 5px;
    padding: 15px 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
    color: black;
    text-align: center;
}


.bottom{
  width: 80vw;
  margin:0 auto;
  .pri {
    margin-top: 40px;
    color: red;
    font-size: 20px;
  }
}

</style>
