<template>
  <div>
    <div class="tabel">
        <el-table
            height="80vh"
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
                prop="id"
                label="订单号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="rid"
                label="房间号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="cid"
                label="用户id"
                width="150">
            </el-table-column>
            <el-table-column
                prop="type"
                label="房间类型"
                width="170">
            </el-table-column>
            <el-table-column
                prop="time"
                label="预约时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="status"
                label="订单状态"
                width="200">
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="240px"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updataorder(scope)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
            <!-- <el-pagination
            background
            layout="total, prev, pager, next"
            :total="totalRecords">
            </el-pagination> -->
        </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
export default {
   methods: {
    updataorder(scope) {
        // 从表格数据中获取当前行的数据
        const orderData = Object.assign({}, scope.row);
        const currentRoute = this.$router.currentRoute;
            // 检查是否要导航到相同的路由
            if (currentRoute.path !== '/admin/updataorder') {
                this.$router.push({path:'/admin/updataorder',
                query: {
                    id: orderData.id,
                    rid: orderData.rid,
                    cid: orderData.cid,
                    type:orderData.type,
                    time:orderData.time,
                    status:orderData.status
                    // 添加其他需要传递的参数
                }
            });
            }
    },
        //实现删除
        async handleDelete(row) {
            // 发送带有 token 的删除请求
            try {
                const response = await axios.post(`http://192.168.1.115:8080/admin/order/delete/${row.id}`,
                { id: row.id }, {
                    headers: {
                        'token':localStorage.getItem('token'),
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
            const response = await this.$axios.get('http://192.168.1.115:8080/admin/order/page', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                },
                headers: {
                    'token':localStorage.getItem('token'),
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
                    pageSize: 10, // 设置你想要的每页显示的记录数
                    totalRecords: 0,
                tableData: [
                        {
                            id:'',
                            rid:'梁礼杰',
                            cid:'礼杰',
                            type:'2312323213213',
                            time:'dsadashdsad',
                            status:'nan'
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