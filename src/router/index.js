// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入登录注册
import login from '../views/login/login'
import user_register from '../views/user_register/user_register'
import main from '../views/lrbanner'
//引入uesrheader
import index from '../views/user/index'
//引入adminheader
import adminindex from '../views/admin/index'
//userheader有关的文件
import home from '../views/user/shoye'
import hotelrooms from '../views/user/hotelrooms'
import myorder from '../views/user/myorder'
import mycenter from '../views/user/mycenter'
import myaccount from '../views/user/myaccount'
import roomdetails from '../views/user/RoomDetails'
import ordernews from '../views/user/ordernews'
//adminheader有关的wenjian
import admincenter from '../views/admin/admincenter'
import addadmin from '../views/admin/addadmin'
import adminnews from '../views/admin/adminnews'
import useradmin from '../views/admin/udmin/useradmin'
import roomadmin from '../views/admin/adminhotelrooms/roomadmin'
import usercenter from '../views/admin/udmin/usercenter'
import updataroom from '../views/admin/adminhotelrooms/updataroom'
import addroom from '../views/admin/adminhotelrooms/addroom'
import hotelorder from '../views/admin/adminhotelrooms/hotelorder'
import updataorder from '../views/admin/adminhotelrooms/updataorder'
import hotelmoney from '../views/admin/adminhotelrooms/hotelmoney'
 
//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/',
            component:main,
            children:[
                {
                    path:'/login',
                    component:login
                },
                {
                    path:'/user_register',
                    component:user_register
                }
            ]
        },
        {
            path:'/front',
            component:index,
            children:[
                {
                    path:'home',
                    component:home
                },
                {
                    //酒店房间详细信息
                    path:'detail_id',
                    component:hotelrooms
                },
                {
                    path:'order',
                    component:myorder
                },
                {
                    path:'person',
                    component:mycenter
                },
                {
                    path:'myaccount',
                    component:myaccount
                },
                {
                    path:'/room/:rid',//动态路由参数
                    name:'roomdetails',
                    component:roomdetails,
                },
                {
                    path:'ordernews',
                    component:ordernews
                }
            ]
        },
        {
            path:'/admin',
            component:adminindex,
            children:[
                {
                    path:'home',
                    component:adminnews
                },
                {
                    path:'admincenter',
                    component:admincenter
                },
                {
                    path:'register',
                    component:addadmin
                },
                {
                    path:'useradmin',
                    component:useradmin,
                },
                {
                    path:'roomadmin',
                    component:roomadmin
                },
                {
                    path:'usercenter',
                    component:usercenter
                },
                {
                    path:'updataroom',
                    component:updataroom
                },
                {
                    path:'addroom',
                    component:addroom
                },
                {
                    path:'hotelorder',
                    component:hotelorder
                },
                {
                    path:'updataorder',
                    component:updataorder
                },
                {
                    path:'hotelmoney',
                    component:hotelmoney
                }
            ]
        }
    ]
})