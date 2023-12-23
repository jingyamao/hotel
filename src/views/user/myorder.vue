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
                width="300px"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updataorder(scope.row)">退房</el-button>
                    <el-button type="success" size="small" @click="ordernews(scope.row)">修改订单</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">取消订单</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    
  </div>
</template>

<script>
export default {
   methods: {
    async updataorder(row) {
        // 从表格数据中获取当前行的数据
        const orderData = Object.assign({}, row);
        // 发送带有 token 的请求
        const response = await this.$axios.post(`http://192.168.1.115:8080/client/order/finish/${row.id}/${row.rid}`, 
                {
                    id: orderData.id,
                    rid: orderData.rid
                },{
                headers: {
                    token: this.token,
                },
            });
        if(response.data.code == 200){
            await this.fetchData();
            this.$message({
                    message: '退房成功',
                    type: 'success',
                    duration: 1000
                });
        }
        },
        //实现修改订单
        ordernews(row){
            this.$router.replace({path:'/front/ordernews',
            query: {
            id: row.id,
            rid: row.rid,
            type: row.type
            // 添加其他需要传递的参数
        }})

        },

        //实现取消订单
        async handleDelete(row) {
            // 发送带有 token 的删除请求
            try {
                const response = await this.$axios.post(`http://192.168.1.115:8080/client/order/delete/${row.id}/${row.rid}/${row.cid}`,
                    { 
                        id: row.id,
                        rid:row.rid,
                        cid:row.cid
                    }, 
                {
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                });

                // 处理服务器的响应，如果需要的话
                // 例如，从数组中删除被删除的
                if(response.data.code === 200){
                    await this.fetchData();
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                    }
                
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
            const response = await this.$axios.get(`http://192.168.1.115:8080/client/order/${Number(localStorage.getItem('id'))}`,{
                params: {
                    id:localStorage.getItem('id'),
                },
                headers: {
                    'token': localStorage.getItem('token'),
                },
            });
            console.log(response.data)
            // 更新数据
            this.tableData = response.data.data;
        },
   },
    mounted: async function() {
        // 组件挂载时发送请求获取初始数据
        this.token = localStorage.getItem('token') || '';
        await this.fetchData();
        
    },
        data() {
            return {
                    token: localStorage.getItem('token') || '',
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