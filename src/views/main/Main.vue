<template>
    <div>
        <el-container class="main-box">
            <el-header>
                <img src="../imgs/logo.png" alt="" style="width: 60px;height: 60px;float: left">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="float: left;margin-left: 10px" background-color="rgb(179,192,209)">
                    <el-menu-item index="1" style="font-size: 30px;color: #666666">
                        一家民宿后台管理中心
                    </el-menu-item>
                </el-menu>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="float: right;margin-right: 10px" background-color="rgb(179,192,209)">
                    <el-submenu index="-1">
                        <template slot="title">admin</template>
                        <el-menu-item index="-1-1">
                            <router-link to="/passwordedit">修改密码</router-link>
                        </el-menu-item>
                        <el-menu-item index="-1-2">
                            <router-link to="/login">
                                <div @click="exit">退出登录</div>
                            </router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu background-color="rgb(211,220,230)">
                        <el-submenu index="21">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">分类管理</span>
                            </template>
                            <el-menu-item>
                                <router-link to="/categoryadd">分类添加</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link to="/categoryindex">分类查看</router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="22">
                            <template slot="title">
                                <i class="el-icon-house"></i>
                                <span slot="title">民宿管理</span>
                            </template>
                            <el-menu-item>
                                <router-link to="/stayhomeadd">民宿添加</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link to="/stayhomeindex">民宿查看</router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="23">
                            <template slot="title">
                                <i class="el-icon-tickets"></i>
                                <span slot="title">
                                    <router-link to="/orders">订单管理</router-link>
                                </span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Main",
        // beforeRouteEnter(){
        //
        // }
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            exit(){
                sessionStorage.clear();
            }
        }
    }
</script>

<style scoped>
.main-box{
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
</style>