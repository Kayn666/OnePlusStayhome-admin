<template>
    <div class="editpass">
        <div class="editpass-content">
            <el-form :model="editpassForm" status-icon :rules="rules" ref="editpassForm" label-width="100px" class="demo-editpassForm">
                <el-form-item label="原密码" prop="oldpass" style="width: 90%;margin: 20px auto">
                    <el-input type="password" v-model="editpassForm.oldpass" placeholder="请输入原密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" style="width: 90%;margin: 20px auto">
                    <el-input type="password" v-model="editpassForm.pass" placeholder="请输入新密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" style="width: 90%;margin: 20px auto">
                    <el-input type="password" v-model="editpassForm.checkPass" placeholder="请确认新密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm('editpassForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {SUCCESS,URL} from "../../../lib/base";

    export default {
        name: "PasswordEdit",
        data() {
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                }else{
                    callback()
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(value == this.editpassForm.oldpass){
                    callback(new Error('新密码与旧密码一致'));
                }else {
                    if (this.editpassForm.checkPass !== '') {
                        this.$refs.editpassForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editpassForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                editpassForm: {
                    oldpass:'',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    oldpass: [
                        { validator: validateOldPass, trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.editpassForm.validate((validate) => {
                    if (validate) {
                        let url = URL + '/admin/User/editPassword';
                        let token = sessionStorage.getItem('token');
                        axios({
                            url,
                            method:'POST',
                            data:this.editpassForm,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            console.log(res);
                            if (res.status === 200 && res.data.code === SUCCESS){
                                this.$message.success(res.data.msg)
                                sessionStorage.clear();
                                this.$router.push('/login')
                            }
                        }).catch(()=>{
                            this.$message.error('密码修改失败')
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .editpass{
        position: absolute;
        left: 0;right: 0;top: 0;bottom: 0;
        background: url("../../imgs/background.jpg");
        background-size: cover;
        background-position: center;
    }
    .editpass > .editpass-content{
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