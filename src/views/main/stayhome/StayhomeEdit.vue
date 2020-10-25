<template>
    <div>
        <loading :isShow="showLoading"></loading>
        <div>
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
                <el-form-item label="民宿状态" style="width: 200px">
                    <el-select v-model="stayhomeform.status">
                        <el-option
                                label="可预订"
                                value=1
                        >
                        </el-option>
                        <el-option
                                label="不可预订"
                                value=0
                        >
                        </el-option>
                    </el-select>
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
                            :file-list="bannerFileList"
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
                    <rich-text  :value="stayhomeform.sdetail"
                                formfield="sdetail"
                                @rich-change="setSnotice"
                    ></rich-text>
                </el-form-item>
                <el-form-item label="入住须知"></el-form-item>
                <el-form-item>
                    <rich-text :value="stayhomeform.snotice"
                               formfield="snotice"
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
    </div>
</template>

<script>
    import {SUCCESS,URL,IMGURL} from "../../../lib/base";
    import loading from "../../../components/Loading/loading";
    import instance from "../../../http/http";
    import RichText from "../../../components/RichText/RichText";
    import city from "../../../lib/city.json"
    // import axios from "axios";
    import {stayhomeRead,stayhomeUpdate} from "../../../http/stayhome";

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
                stayhomeform:null,
                bannerFileList:[],
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
            initStayhome(sid){
                stayhomeRead(sid).then(res=>{
                    if (res.data){
                        console.log(res);
                        this.stayhomeform = res.data;
                        this.bannerArr = res.data.sbanner1;
                        this.bannerFileList = res.data.sbanner1.map(ele=>({name:res.data.sname,url:this.IMGURL + ele}))
                        if (this.stayhomeform.status==1){
                            this.stayhomeform.status='可预订'
                        }else {
                            this.stayhomeform.status='不可预订'
                        }
                    }
                }).catch(error=>{
                    console.log(error);
                });
            },
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
                let url =file.response ? file.response.imgpath : file.url
                this.bannerArr = this.bannerArr.filter(ele=> !url.includes(ele))
                this.stayhomeform.sbanner=this.bannerArr.join(',')
            },
            handleBannerPreview(file){
                this.dialogVisible = true
                let url;
                if (file.response){
                    url = this.IMGURL + file.response.imgpath
                }else {
                    url = file.url
                }
                this.dialogPreviewImg = url;
            },
            setSnotice(field,html){
                this.stayhomeform[field]=html
            },
            setProvince(){
                this.province=this.city.map(ele=>ele.name)
            },
            handlerSubmit(){
                stayhomeUpdate(this.stayhomeform.sid , this.stayhomeform).then(res=>{
                    this.$message.success(res.msg)
                }).catch(error=>{
                    this.$message.error(error.msg)
                });
            }
        },
        mounted() {
            let sid = this.$route.params.sid
            this.initStayhome(sid)
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