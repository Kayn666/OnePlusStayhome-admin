<template>
    <div>
        <div v-if="category">
            <el-form :model="category" :rules="categoryRules" ref="categoryForm">
                <el-form-item label="分类名称" prop="cname">
                    <el-input v-model="category.cname" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="cdesc">
                    <el-input v-model="category.cdesc" placeholder="请描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlerSubmit">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL,SUCCESS} from "../../../lib/base";
/*
* 1.编辑的是那条数据 index ==> edit (query)
* 2.获取当前编辑数据 当前被激活的路由query
* 3.发请求
* */
    export default {
        name: "CategoryEdit",
        data(){
            // eslint-disable-next-line no-unused-vars
            let validateCname = (rule,value,callback)=>{
                if (value === ''){
                    callback(new Error('分类名称不能为空'))
                }else if(!(/[\u4e00-\u9fa5]{2,6}/.test(value))){
                    callback(new Error('分类名称应为2-6位汉字'))
                }else{
                    callback()
                }
            }
            return{
                category:null,
                categoryRules:{
                    cname: [
                        {
                            validator:validateCname,
                            trigger: "blur"
                        }
                    ],
                    cdesc: [
                        { required: true, message: '描述不能为空', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handlerSubmit(){
                this.$refs.categoryForm.validate(valid=>{
                    if (valid){
                        let url = URL + '/admin/category/edit';
                        let token = sessionStorage.getItem('token')
                        axios({
                            url,
                            method:'POST',
                            data:this.category,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            console.log(res);
                            if (res.status === 200 && res.data.code === SUCCESS){
                                this.$message.success(res.data.msg)
                            }
                        }).catch(()=>{
                            this.$message.error('分类修改失败')
                        })
                    }
                })
            },
            initCategory(cid){
                let url = URL + '/admin/category/read'
                let token = sessionStorage.getItem('token')
                axios({
                    method:'GET',
                    url,
                    params:{cid},
                    headers:{
                        token
                    }
                }).then(res=>{
                    if (res.status===200 && res.data.code === SUCCESS){
                        if (res.data.data){
                            this.category = res.data.data
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    }
                }).catch(()=>{

                })
            }
        },
        mounted() {
            let {cid}=this.$route.query;
            this.initCategory(cid)
        }
    }
</script>

<style scoped>

</style>