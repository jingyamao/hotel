<template>
  <div>
    <div class="tabel">
        <el-table
            
            :data="tableData1"
            style="width: 100%"
            >
            <el-table-column
                prop="income"
                label="酒店业务收入(元)"
                width="200">
            </el-table-column>
            <el-table-column
                prop="client_account"
                label="客户账户总资金(元)"
                width="200">
            </el-table-column>
            <el-table-column
                prop="total"
                label="酒店总资金(元)"
                width="200">
            </el-table-column>
        </el-table>
        <div class="llog">
            <el-table
                :data="tableData2"
                style="width: 100%"
                v-loading="loadingData">
                <el-table-column
                prop="log"
                label="酒店资金流水"
                width="1000">
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
   methods: {
    async fetchDataFromServer() {
            try {
                const tokenFromLocalStorage = localStorage.getItem('token');
                const response = await axios.get(`http://192.168.1.115:8080/admin/HotelBill`, {
                headers: {
                    "token": tokenFromLocalStorage // 假设你的数据中有 tokenFromLocalStorage
                },
                });

                // 处理响应数据
                const userData = response.data;

                // 使用从服务器获取的用户数据更新你的组件数据
                this.tableData1=[{
                total:userData.data.total,
                client_account:userData.data.clientAccount,
                income:userData.data.income,
                }]
                this.tableData2 = userData.data.log.split("?").map(item =>({log:item}));
                this.$message({
                type: 'success',
                message: '数据获取成功！',
                });
            } catch (error) {
                // 处理错误
                console.error('获取数据出错：', error);

                // 示例：显示错误消息
                this.$message.error('获取数据失败，请重试。');
            }
        },
   },
    mounted() {
        // 组件挂载时发送请求获取初始数据
        this.fetchDataFromServer();
    },
        data() {
            return {
                tableData1: [
            
            ], // 修改为数组来存储多行数据
            tableData2:[],
            temp : '',
            }
        }
}
</script>

<style lang="less" scoped>

</style>