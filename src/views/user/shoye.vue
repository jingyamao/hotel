<template>
  <div class="mainbanner">
        <div class="pick">
            <img src="../../img/hotelshoye.png" alt="">
        </div>
        <div class="jieshaobody">
            <h2>酒店服务升级</h2>
            <div class="nice">
                <div class="nicehotel">
                    <img src="../../img/hotel1.png" alt="">
                    <div>知名酒店，客房充足，选择多多</div>
                </div>
                <div class="nicehotel">
                    <img src="../../img/hotel2.png" alt="">
                    <div>专业服务，房间干净，放心入住</div>
                </div>
                <div class="nicehotel">
                    <img src="../../img/hotel3.png" alt="">
                    <div>安全便捷，服务保障，用心生活</div>
                </div>
            </div>
        </div>
        <div class="goodrooms">
            <h2>酒店优质房间</h2>
            <div class="nicerooms">
                <ul>
                    <li v-for="room in hotelRooms" :key="room.rid">
                        <div style="text-align: left;">
                            <img :src="room.picture1" alt="" >
                            <div style="font-size: 16px; font-weight: bold; color: rgb(69, 88, 115); margin-top: 10px;">
                                {{ room.type }}
                            </div>
                            <div style="margin-top: 10px;">
                                <span style="font-size: 16px; font-weight: bold; color: red;">
                                    ￥{{ room.price }} 
                                </span>
                                起
                                <span style="font-size: 14px; color: rgb(69, 88, 115); margin-top: 10px; margin-left: 20px;">
                                    <i class="el-icon-s-flag" style="color: red"></i>
                                    好评如潮
                                </span>
                            </div>
                        </div>
                    </li>
                    <!-- <li >
                        <div style="text-align: left;">
                            <img src="../../img/hotelshoye.png" alt="">
                            <div style="font-size: 16px; font-weight: bold; color: rgb(69, 88, 115); margin-top: 10px;">
                                djaslkdj
                            </div>
                            <div style="margin-top: 10px;">
                                <span style="font-size: 16px; font-weight: bold; color: red;">
                                    ￥1329013209
                                </span>
                                起
                                <span style="font-size: 14px; color: rgb(69, 88, 115); margin-top: 10px; margin-left: 20px;">
                                    <i class="el-icon-s-flag" style="color: red"></i>
                                    好评如潮
                                </span>
                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'home',
    data() {
        return {
            page:1,
            pageSize:1000,
            hotelRooms: [], // 存储酒店房间信息的数组
        };
    },
    mounted() {
        // 在挂载完成时发送GET请求获取酒店房间信息
        this.$axios({
                    methods: 'get',
                    url:'http://192.168.1.115:8080/client/room/page',
                    headers: {
                        'token':localStorage.getItem('token'),
                    },
                    params:{
                        page: this.page,
                        pageSize: this.pageSize,
                    }
                })
        .then((response) => {
        if (response.data) {
            // 将获取到的酒店房间信息赋值给数据属性 hotelRooms
            console.log(response);
            this.hotelRooms = response.data.data.records;
        }
        })
        .catch((error) => {
            console.log(this.page,this.pageSize)
            console.error('获取酒店房间信息失败', error);
        });
    },
}
</script>

<style lang="less" scoped>
     .mainbanner{
        margin: 0 auto;
        max-width: 1440px;
        width: 100vw;
        .pick{
            img {
                
                width: 100%;
                height: 100%;
                object-fit: cover; /* 保持图片比例并填满整个容器 */
                border-radius:0 0 40% 40%; /* 如果需要圆角，可以在这里设置 */
            }
        }
        .jieshaobody{
            width: 60%;
            margin: 30px auto;
            h2{
                text-align: center;
            }
            .nice{
                display: flex;
                margin-top: 30px;
                .nicehotel{
                    flex: 1 1 0%;
                    text-align: center;
                    img{
                        width: 50px;
                    }
                    div{
                        font-size: 14px;
                        color: rgb(69, 88, 115);
                        margin-top: 10px;
                    }
                }
            }
        }

        .goodrooms{
            width: 60%;
            margin: 30px auto;
            h2{
                text-align: center;
            }
            .nicerooms{
                margin-top: 30px;
                ul{
                    list-style-type: none;
                    li{
                        display: inline-block;
                        width: 25%;
                        height: 300px;
                        padding-left: 10px;
                        padding-right: 10px;
                        padding-bottom: 20px;
                        box-sizing: border-box;
                        border: 1px solid #fff;
                        img{
                            width: 100%;
                            height: 175px;
                            border-radius: 10px;
                        };
                    }
                    li:hover{
                        border: 1px solid #2fb9c2;
                    }
                }
               
            }
        }
    }
</style>
