<template>
    <div>
        <loading :isShow="showLoading"></loading>
        <el-form :model="stayhomeform" ref="stayhomeform">
            <el-form-item label="所属分类" style="width: 200px">
                <el-select v-model="stayhomeform.cid" placeholder="请选择">
                    <el-option
                            v-for="item in categorys"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="stayhomeform.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿描述">
                <el-input type="textarea" v-model="stayhomeform.sdesc"></el-input>
            </el-form-item>
            <el-form-item label="民宿标签">
                <el-input v-model="stayhomeform.stag"></el-input>
            </el-form-item>
            <el-form-item label="民宿评分">
                <el-input v-model="stayhomeform.score"></el-input>
            </el-form-item>
            <el-form-item label="民宿价格">
                <el-input v-model="stayhomeform.sprice"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" style="width: 200px">
                <el-select v-model="stayhomeform.sprovince">
                    <el-option v-for="(item,index) in province" :value="item" :key="index" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市" style="width: 200px">
                <el-select v-model="stayhomeform.scity">
                    <el-option v-for="(item,index) in cityList" :value="item" :key="index" :label="item"></el-option>
                </el-select >
            </el-form-item>
            <el-form-item label="所在区域" style="width: 200px">
                <el-select v-model="stayhomeform.sarea">
                    <el-option v-for="(item,index) in areaList" :value="item" :key="index" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿地址">
                <el-input v-model="stayhomeform.saddress"></el-input>
            </el-form-item>
            <el-form-item label="民宿缩略图"></el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handleThumbSuccess"
                        :before-upload="handleThumbBeforeupload">
                    <img v-if="stayhomeform.sthumb" :src="IMGURL + stayhomeform.sthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb,最佳比例1:1</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图"></el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-success="handleBannerSuccess"
                        :before-upload="handleThumbBeforeupload"
                        :on-remove="handleBannerRemove"
                        :on-preview="handleBannerPreview"
                >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb,最佳比例1:1，最多上传5张</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿详情"></el-form-item>
            <el-form-item>
                <rich-text formfield="sdetail"
                           @rich-change="setSnotice"
                ></rich-text>
            </el-form-item>
            <el-form-item label="入住须知"></el-form-item>
            <el-form-item>
                <rich-text formfield="snotice"
                           @rich-change="setSnotice"></rich-text>
            </el-form-item>
            <el-form-item>
                <el-button @click="handlerSubmit">提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogPreviewImg" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {SUCCESS,URL,IMGURL} from "../../../lib/base";
    import loading from "../../../components/Loading/loading";
    import instance from "../../../http/http";
    // import E from 'wangeditor';
    import RichText from "../../../components/RichText/RichText";
    import city from "../../../lib/city.json"
    import axios from "axios";

    export default {
        name: "Stayhomeadd",
        components:{
            loading,
            RichText
        },
        data(){
            return{
                IMGURL,
                uploadurl:URL + '/admin/upload/index',
                showLoading:false,
                categorys:[],
                stayhomeform:{
                    sname:'',
                    sdesc:'',
                    sthumb:'',
                    sprice:'',
                    stag:'',
                    sprovince:'',
                    scity:'',
                    sarea:'',
                    saddress:'',
                    sbanner:'',
                    snotice:'',
                    sdetail:'',
                    cid:'',
                    score:''
                },
                bannerArr:[],
                dialogVisible:false,
                dialogPreviewImg:'',
                city,
                province:[]
            }
        },
        computed:{
            cityList(){
                let cityLists = [];
                let current = this.city.find(ele=>ele.name === this.stayhomeform.sprovince)
                if (current){
                    cityLists = current.city.map(ele=>ele.name)
                }
                return cityLists
            },
            areaList(){
                let areaLists = [];
                let current = this.city.find(ele=>ele.name === this.stayhomeform.sprovince)
                if (current){
                    let city = current.city.find(ele=>ele.name === this.stayhomeform.scity)
                    if (city){
                        areaLists = city.area
                    }
                }
                return areaLists;
            }
        },
        methods:{
            initCategory(){
                this.showLoading=true;
                instance('/admin/category/indexall').then(res=>{
                    this.showLoading=false
                    if (res.code === SUCCESS){
                        this.categorys = res.data
                    }
                }).catch(()=>{

                })
            },

            handleThumbSuccess(res){
                if(res.code===SUCCESS){
                    this.stayhomeform.sthumb = res.imgpath
                }
                console.log(res);
            },
            handleThumbBeforeupload(file) {
                let {size,type}=file;
                let uploadMaxSize = 200*1024;
                let uploadType = ['image/jpeg','image/jpg','image/png','image/webp']
                let sizeFlag = true,typeFlag = true;
                sizeFlag = size <uploadMaxSize;
                typeFlag = uploadType.some(ele=>ele==type);
                if (!typeFlag) {
                    this.$message.error('上传图片只能是 JPG,JPEG,PNG或WEBP 格式!');
                }
                if (!sizeFlag) {
                    this.$message.error('上传头像图片大小不能超过 200KB!');
                }
                return sizeFlag && typeFlag;
            },
            handleBannerSuccess(res){
                this.bannerArr.push(res.imgpath);
                this.stayhomeform.sbanner=this.bannerArr.join(',')
            },
            handleBannerRemove(file){
                let url =file.response.imgpath
                this.bannerArr = this.bannerArr.filter(ele=>ele!=url)
                this.stayhomeform.sbanner=this.bannerArr.join(',')
            },
            handleBannerPreview(file){
                let url = this.IMGURL + file.response.imgpath
                this.dialogVisible = true
                this.dialogPreviewImg = url;
            },
            // initRichText(){
            //     let that = this;
            //     let edit = new E(this.$refs.sdetail)
            //     edit.customConfig.showLinkImg = false
            //     edit.customConfig.uploadImgServer = this.uploadurl;
            //     edit.customConfig.uploadFileName = 'file'
            //     edit.customConfig.onchange=(html)=>{
            //         console.log(html);
            //         this.stayhomeform.sdetail=html
            //     }
            //     edit.customConfig.uploadImgHooks={
            //         customInsert:function (insertImg,result) {
            //             insertImg(that.IMGURL + result.imgpath)
            //         }
            //     }
            //     edit.create()
            //     // edit.txt.html('<p>用JS设置的内容</p>')
            // },
            setSnotice(field,html){
                this.stayhomeform[field]=html
            },
            setProvince(){
                this.province=this.city.map(ele=>ele.name)
            },
            handlerSubmit(){
                // this.$refs.stayhomeform.validate(valid=>{
                //     if (valid){


                        let url = URL + '/api/stayhome';
                        let token = sessionStorage.getItem('token')
                        axios({
                            url,
                            method:'POST',
                            data:this.stayhomeform,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            console.log(res);
                            if (res.status === 200 && res.data.code === SUCCESS){
                                this.$message.success(res.data.msg)
                            }
                        }).catch(()=>{
                            this.$message.error('民宿添加失败')
                        })


                //     }
                // })
            }
        },
        mounted() {
            this.city=city
            this.setProvince()
            this.initCategory();
            this.initRichText();
        }
    }
</script>

<style>
    .w-e-toolbar{
        height: 52px;
    }
    .w-e-menu{
        height: 100%;
        line-height: 52px;
    }
    .el-icon-plus.avatar-uploader-icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /*.el-upload{*/
    /*    float: left;*/
    /*}*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style scoped>

</style>