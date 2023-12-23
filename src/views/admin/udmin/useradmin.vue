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
                label="用户ID"
                width="100px">
            </el-table-column>
            <el-table-column
                prop="avatar"
                label="用户头像"
                width="150">
            <template slot-scope="scope">
                <!-- <template > -->
                    <div class="cell">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 50px; height: 50px;">
                                <img :src="scope.row.avatar" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                                <!-- <img src="../../../img/hotelbackground.jpg" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%;"> -->
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="账号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="170">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话"
                width="150">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="150">
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别"
                width="100">
            </el-table-column>
            <el-table-column
                prop="status"
                label="账号状态"
                width="100">
            </el-table-column>
            <el-table-column
                prop="balance"
                label="账户余额"
                width="100">
            </el-table-column>
            <el-table-column
                prop="miss"
                label="失约次数"
                width="100">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="300px"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="pushusercenter(scope.row)">修改</el-button>
                    <el-button type="warning" size="small" @click="handleDisable(scope.row)">禁用账号</el-button>
                    <el-button type="danger" size="small" @click="handleuplock(scope.row)">启用账号</el-button>
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
        pushusercenter(row){
            // 检查是否与要导航的路由相同
                // 导航到新的路由
                console.log(row.id)
                this.$router.push({
                    path: '/admin/usercenter',
                    query: {
                        id:row.id,
                        username: row.username,
                        password: row.password,
                        name: row.name,
                        phone: row.phone,
                        email: row.email,
                        avatarurl: row.avatar,
                        gender: row.gender,
                        status: row.status,
                        balance: row.balance,
                        miss: row.miss,
                    }
                });
            
        },
        //实现启用
        async handleuplock(row) {
            // 发送带有 token 的删除请求
            try {
                const response = await axios.post('http://192.168.1.115:8080/admin/client/unlock', 
                 { id: row.id }, 
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                });

                // 处理服务器的响应，如果需要的话
                // 例如，从数组中删除被删除的用户
                // console.log(response)
                this.fetchData();
                // this.row.status = 1;
                this.$message({
                    message: '启用成功',
                    type: 'success',
                    duration: 1000
                });
            } catch (error) {
                console.error('启用失败:', error);
                this.$message({
                    message: '启用失败，请稍后重试',
                    type: 'error',
                    duration: 1000
                });
            }
        },
        //实现禁用
        async handleDisable(row) {
            // 发送带有 token 的更新状态请求
            const response = await axios.post('http://192.168.1.115:8080/admin/client/lock', 
              {
                id:row.id,
            },{

                headers: {
                    'token': localStorage.getItem('token'),
                },
            });
            // console.log(response.data)
            await this.fetchData();
            row.status = 0;
            this.$message({
                        message: '禁用成功',
                        type: 'success',
                        duration: 1000
                    });
         },
        //实现分页查询
         async fetchData() {
            // 发送带有 token 的请求
            const response = await this.$axios.get('http://192.168.1.115:8080/admin/client/page', {
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
                    pageSize: 5, // 设置你想要的每页显示的记录数
                    totalRecords: 0,
                tableData: [
                    {
                        avatar:'',
                        id:'',
                        username:'梁礼杰',
                        password:'',
                        name:'礼杰',
                        phone:'2312323213213',
                        email:'dsadashdsad',
                        gender:'nan',
                        status:'希纳斯江科大刷卡机',
                        balance:'dhash',
                        miss:'888'
                    },
                ]
            }
        }
}
</script>

<style lang="less" scoped>
.search{
    margin-top: -25px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
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