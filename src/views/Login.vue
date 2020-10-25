<template>
    <div class="login">
        <div class="login-content">
            <el-form :rules="rules" ref="loginForm" :model="loginForm">
                <el-form-item label="用户名：" prop="username" style="width: 90%;margin: 20px auto">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密 码：" prop="password" style="width: 90%;margin: 20px auto">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    /*
    * 1.表单验证
    * 2.fetch   axios
    * */
    import axios from 'axios';
    import {SUCCESS,URL} from "../lib/base";
    // import base from "../lib/base"
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            handleLogin(){
                this.$refs.loginForm.validate(validate=>{
                    if(validate){
                        let url=URL
                        axios.post(url+'/admin/login/check',this.loginForm).then((res)=> {
                            if(res.status===200 && res.data.code===SUCCESS){
                                sessionStorage.setItem('token',res.data.token);
                                let redirect=this.$route.query.redirect || 'index';
                                this.$router.push({name:redirect})
                            }else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
.login{
    position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    background: url("imgs/background.jpg");
    background-size: cover;
    background-position: center;
}
.login > .login-content{
    width: 400px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgb(221,230,203);
    border-radius: 5%;
}
</style>