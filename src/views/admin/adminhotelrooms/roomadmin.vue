<template>
  <div>
    <div class="tabel">
        <el-table
            height="80vh"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
                prop="rid"
                label="房间号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="avatar"
                label="房间图片"
                width="200">
                <template slot-scope="scope">
                    <div class="cell">
                        <div style="display: flex; align-items: center;">
                            <div style="height: 70px;">
                                <!-- <img src="../../../img/hotelbackground.jpg" alt="Avatar" style="height: 70px;"> -->
                                <img :src="scope.row.picture1" alt="Avatar" style="height: 70px;">
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="floor"
                label="楼层"
                width="100">
            </el-table-column>
            <el-table-column
                prop="type"
                label="房间类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="time1"
                label="预约开始时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="time2"
                label="预约截止时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="price"
                label="房间价格"
                width="150">
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="240px"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="replaceupdataroom(scope)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    <!-- <el-button type="warning" size="small">是否禁用</el-button>
                    <el-button type="danger" size="small" >删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            background
            layout="total,prev, pager, next"
            :total="this.totalRecords"
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
    //修改房间
   replaceupdataroom(scope){
        // 从表格数据中获取当前行的房间数据
        const roomData = Object.assign({}, scope.row);
        console.log(roomData.type)
        // 使用 this.$router.replace 导航到目标路由并传递参数
        this.$router.push({
        path: '/admin/updataroom', // 目标路由路径
        query: {
            rid: roomData.rid,
            floor: roomData.floor,
            time1: roomData.time1,
            time2: roomData.time2,
            type: roomData.type,
            picture1: roomData.picture1,
            picture2: roomData.picture2,
            picture3: roomData.picture3,
            price: roomData.price,
        }
        });
   },

        //实现删除
        async handleDelete(row) {
            // 发送带有 token 的删除请求
            try {
                const response = await this.$axios.post(`http://192.168.1.115:8080/admin/room/delete/${row.rid}`, 
                { rid: row.rid }, 
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                });

                // 处理服务器的响应，如果需要的话
                // 例如，从数组中删除被删除的
                this.fetchData();
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                    });

               
            } catch (error) {
                console.error('删除失败:', error);
                this.$message({
                    message: '删除失败，请稍后重试',
                    type: 'error',
                    duration: 1000
                });
            }
        },

        //实现分页查询
         async fetchData() {
            // 发送带有 token 的请求
            const response = await this.$axios.get('http://192.168.1.115:8080/admin/room/page', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
                headers: {
                    'token': localStorage.getItem('token'),
                },
            });
            
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
                    search: '',
                    currentPage: 1,
                    pageSize: 3, // 设置你想要的每页显示的记录数
                    totalRecords: 10,
                tableData: [
                        {
                            rid:'',
                            floor:'梁礼杰',
                            type:'礼杰',
                            time1:'2312323213213',
                            time2:'dsadashdsad',
                            picture1:'',
                            picture2:'',
                            picture3:'',
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
    margin-top: -25px;
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