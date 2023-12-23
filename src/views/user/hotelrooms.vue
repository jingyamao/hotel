<template>
  <div style="max-width: 1440px; margin: 0 auto">
    <div class="top">
            <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                style="width:20%;float:left;"
            ></el-cascader>
            <el-input
                placeholder="请输入起始时间"
                suffix-icon="el-icon-date"
                v-model="input1"
                style="float:left;width:150px">
            </el-input>
            <el-input
                placeholder="请输入截止时间"
                suffix-icon="el-icon-date"
                v-model="input2"
                style="float:left;width:150px">
            </el-input>
            <el-button type="primary" @click="search()">提交</el-button>
        </div>
    <div class="tabel">
        <el-table
            height="70vh"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
                prop="rid"
                label="房间号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="avatar"
                label="房间图片"
                width="170">
                <template slot-scope="scope">
                <!-- <template > -->
                    <div class="cell">
                        <div style="display: flex; align-items: center;">
                            <div style="height: 100px;">
                                <!-- <img :src="scope.row.avatar" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%;"> -->
                                <!-- <img src="../../img/hotelbackground.jpg" alt="Avatar" style="height: 100px;"> -->
                                <img :src="scope.row.picture1" alt="Avatar" style="height: 100px;">
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="floor"
                label="楼层"
                width="170">
            </el-table-column>
            <el-table-column
                prop="type"
                label="房间类型"
                width="170">
            </el-table-column>
            <el-table-column
                prop="time1"
                label="预约开始时间"
                width="170">
            </el-table-column>
            <el-table-column
                prop="time2"
                label="预约截止时间"
                width="170">
            </el-table-column>
            <el-table-column
                prop="price"
                label="房间价格"
                width="170">
            </el-table-column>
            <el-table-column
                prop="status"
                label="房间状态"
                width="170">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="240px"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handlecilck(scope.row)">查看详情</el-button>
                    <!-- <el-button type="warning" size="small">是否禁用</el-button>
                    <el-button type="danger" size="small" >删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            background
            layout="total,prev, pager, next"
            :total="totalRecords"
            :page-size="this.pageSize"
            :current-page.sync="currentPage"
            @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
export default {
   methods: {
    handleChange(value) {
      this.selectedStage = value[0]; // 楼层
      this.selectedRoomStyle = value[1]; // 房间类型
    },
    //查询
    search(){
      axios.get('http://192.168.1.115:8080/client/room/page',
      {
        params:{
          time1 : this.input1,
          time2 : this.input2,
          floor: this.selectedStage, // 发送用户选择的楼层
          type : this.selectedRoomStyle,
          page : this.currentPage,
          pageSize :this.pageSize,
        },
        headers:{
          "token":localStorage.getItem('token'),
        }
      },)
      .then((response)=>{
        console.log("提交成功：",response.data);
        this.$message({
          message:"提交成功",
          type:'success',
          duration: 1000,
        });
        const newData = response.data.data.records;
        this.tableData = newData;
      })
    },
        handlecilck(row){
            // 从表格数据中获取当前行的房间数据
            const roomData = Object.assign({}, row);
            this.$router.push({name:'roomdetails',
            params: {
            rid: roomData.rid,
            floor: roomData.floor,
            type:roomData.type,
            time1: roomData.time1,
            time2: roomData.time2,
            picture1: roomData.picture1,
            picture2: roomData.picture2,
            picture3: roomData.picture3,
            price: roomData.price
            // 添加其他需要传递的参数
        }})
        },
        //实现分页查询
         async fetchData() {
            // 发送带有 token 的请求
            const response = await axios({
                    methods:'get',
                    timeout: 1000,
                    url:'http://192.168.1.115:8080/client/room/page',
                    headers: {
                        token:localStorage.getItem('token'),
                    },
                    params:{
                        page: this.currentPage,
                        pageSize: this.pageSize,
                    }
                }
            );
            // 更新数据
            this.tableData = response.data.data.records;
            this.totalRecords = response.data.data.total;
        },
        handlePageChange(newPage) {
                // 处理页面切换事件
                this.currentPage = newPage;
                this.fetchData();
        },
    },
    mounted: async function() {
        // 组件挂载时发送请求获取初始数据
        await this.fetchData();
    },
        data() {
            return {
                input1:'',
                input2:'',
                value: [],
                options:[
                    {
                        value:'1',
                        label:'一楼',
                        children:[{
                            value:'标准房',
                            label:'标准房'
                        },{
                            value:'大床房',
                            label:'大床房'
                        },{
                            value:'双人房',
                            label:'双人房'
                        },{
                            value:'豪华房',
                            label:'豪华房'
                        }]
                    },
                    {
                        value:'2',
                        label:'二楼',
                        children:[{
                            value:'标准房',
                            label:'标准房'
                        },{
                            value:'大床房',
                            label:'大床房'
                        },{
                            value:'双人房',
                            label:'双人房'
                        },{
                            value:'豪华房',
                            label:'豪华房'
                        }]
                    },
                    {
                        value:'3',
                        label:'三楼',
                        children:[{
                            value:'标准房',
                            label:'标准房'
                        },{
                            value:'大床房',
                            label:'大床房'
                        },{
                            value:'双人房',
                            label:'双人房'
                        },{
                            value:'豪华房',
                            label:'豪华房'
                        }]
                    },
                    {
                        value:'4',
                        label:'四楼',
                        children:[{
                            value:'标准房',
                            label:'标准房'
                        },{
                            value:'大床房',
                            label:'大床房'
                        },{
                            value:'双人房',
                            label:'双人房',
                        },{
                            value:'豪华房',
                            label:'豪华房',
                        }]
                    }
                ],
                    currentPage: 1,
                    pageSize: 5, // 设置你想要的每页显示的记录数
                    totalRecords: 0,
                tableData: [
                        {
                            rid:'2321',
                            floor:'梁礼杰',
                            type:'礼杰',
                            time1:'2312323213213',
                            time2:'dsadashdsad',
                            picture1: '',
                            picture2: '',
                            picture3: '',
                            price:'nan'
                        },
                    ]
            }
        }
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
    .search{
        width: 400px;

    }
    .addroom{
        flex: 0;
        width: 200px;
    }
}

.tabel{
    margin-top: 5px;
    padding: 15px 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
    .cell{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
    }
    
}
.block{
    margin-top: 5px;
    margin-left: 30%;
    padding-top: 15px;
    background-color: #fff;
}
</style>