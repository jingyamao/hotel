<template>
  <div>
    <div class="tabel">
        <div class="llog">
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loadingData">
                <el-table-column
                    prop="log"
                    label="个人资金流水"
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
        //实现查询
         async fetchData() {
            // 发送带有 token 的请求
            const response = await this.$axios.get(`http://192.168.1.115:8080/client/account/${Number(localStorage.getItem('id'))}`, {
                params: {
                    id:localStorage.getItem('id'),
                },
                headers: {
                    'token': localStorage.getItem('token'),
                },
            });
            console.log(response.data.data);
            this.$message({
                        type: 'success',
                        message: '查询成功',
                    });
            // 更新数据
            // 将以问号为分隔符的字符串分割成数组
            const logArray = response.data.data.log.split('?');

            // 更新数据
            this.tableData = logArray.map((log, index) => ({
                id: index + 1,
                log: log.trim(),  // 去除字符串两端的空格
            }));
        },
   },
    mounted: async function() {
        // 组件挂载时发送请求获取初始数据
        await this.fetchData();
    },
        data() {
            return {
                tableData: [],
                loadingData: false,
            }
        }
}
</script>

<style lang="less" scoped>


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