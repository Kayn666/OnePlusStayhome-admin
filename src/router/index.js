'use strict';
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import Login from "../views/Login";
import Main from "../views/main/Main";
import List from "../views/main/List";
import CategoryAdd from "../views/main/category/Add";
import CategoryIndex from "../views/main/category/Index";
import CategoryEdit from "../views/main/category/CategoryEdit";
import PasswordEdit from "../views/main/User/PasswordEdit";
import Stayhomeadd from "../views/main/stayhome/Stayhomeadd";
import StayhomeIndex from "../views/main/stayhome/Index";
import StayhomeEdit from "../views/main/stayhome/StayhomeEdit";
import Echartscom from "../views/echarts/Echarts";
import Orders from "../views/main/Orders/Index";

let router = new VueRouter({
    routes: [
        {
            path: '/', component:     Main, name: 'index',
            redirect:'/echarts',
            meta: {
                auth: true,title:"首页"
            },
            children:[
                {
                    path:"categoryadd",
                    component:CategoryAdd,
                    name:"categoryadd",
                    meta:{
                        title:'分类添加',
                        auth:true
                    }
                },
                {
                    path:"categoryindex",
                    component:CategoryIndex,
                    name:"categoryindex",
                    meta:{
                        title:'分类查看',
                        auth:true
                    }
                },
                {
                    path:"categoryedit",
                    component:CategoryEdit,
                    name:"categoryedit",
                    meta:{
                        title:'分类编辑',
                        auth:true
                    }
                },
                {
                    path: "stayhomeadd",component: Stayhomeadd,name: 'stayhomeadd',
                    meta:{
                        title:'民宿添加',
                        auth:true
                    }
                },
                {
                    path: "stayhomeindex",component: StayhomeIndex,name: 'stayhomeindex',
                    meta:{
                        title:'民宿查看',
                        auth:true
                    }
                },
                {
                    path: "stayhomeedit/:sid",component: StayhomeEdit,name: 'stayhomeedit',
                    meta:{
                        title:'民宿编辑',
                        auth:true
                    }
                },
                {
                    path: "echarts",component: Echartscom,name: 'echarts',
                    meta:{
                        title:'数据',
                        auth:true
                    }
                },
                {
                    path: "orders",component: Orders,name: 'orders',
                    meta:{
                        title:'订单管理',
                        auth:true
                    }
                },
            ]
        },
        {
            path: '/login', component: Login, name: 'login',
            meta: {
                title: '管理员登录',
                auth: false
            }
        },
        {
            path: '/list', component: List, name: 'list',
            meta: {
                auth: true
            }
        },
        {
            path: '/passwordedit',component: PasswordEdit,name: 'passwordedit',
            meta:{
                title:'修改密码',
                auth:true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    let title = to.meta.title;
    document.title=title || '首页';
    if (to.meta.auth) {
        let token = sessionStorage.getItem('token');
        token = token && token.trim()
        if (token) {
            next()
        } else {
            next({name: 'login', query: {redirect: to.name}})
        }
    } else {
        next()
    }
})

export default router;