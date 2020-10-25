<template>
    <div>
        <loading :isShow="isshow"></loading>
        <el-form :inline="true" class="search">
            <el-form-item label="民宿名称:">
                <el-input v-model="search.sname" placeholder="民宿名称"></el-input>
            </el-form-item>
            <el-form-item label="民宿城市:">
                <el-input v-model="search.scity" placeholder="民宿城市"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="stayhomes" stripe>
            <el-table-column prop="sid" label="ID"></el-table-column>
            <el-table-column prop="sname" label="民宿名称"></el-table-column>
            <el-table-column prop="status" label="民宿状态"></el-table-column>
            <el-table-column prop="sprice" label="民宿价格"></el-table-column>
<!--            <el-table-column label="民宿标签">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button size="mini" v-for="item in scope.row.stag" :key="item">{{item}}</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column label="民宿地点">
                <template slot-scope="scope">
                    <span>{{scope.row.sprovince}}-{{scope.row.scity}}-{{scope.row.sarea}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="民宿缩略图">
                <template slot-scope="scope">
                    <img :src="scope.row.sthumb" alt="" style="height: 50px">
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.ctime| formatTimer('hours')}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="warning"
                            >
                        <router-link :to="{name:'stayhomeedit',params:{sid:scope.row.sid}}" style="color: #fff">编辑</router-link>
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.sid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    :total="total"
                    :page-size.sync="paginate.limit"
                    :current-page.sync="paginate.page"
                    layout="total,prev,pager,next,jumper"
                    @current-change="handlerCurrentPageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {IMGURL} from "../../../lib/base";
    // import axios from "axios";
    import instance from "../../../http/http";
    import loading from "../../../components/Loading/loading";
    import {stayhomeDelete} from "../../../http/stayhome";

    export default {
        name: "Index",
        data(){
            return{
                //搜索条件
                search:{sname:'',scity:'',cid:''},
                //分页
                paginate:{
                    page:1,
                    limit:5
                },
                stayhomes:[],
                total:0,
                isshow:false,
            }
        },
        components:{
            loading
        },
         methods:{
             initStayhome(){
                 this.isshow=true;
                 let params = Object.assign({},this.paginate,this.search)
                 instance.get('/api/stayhome',{
                     params
                 }).then(res=>{
                     this.isshow=false;
                     if (res.data){
                         let data = res.data;
                         data.map(ele=>{
                             ele.stag = ele.stag.split(/,|，/);
                             ele.sthumb = IMGURL + ele.sthumb
                             // let date = new Date(ele.ctime*1000)
                             // ele.ctime=[date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')
                             if (ele.status==1){
                                 ele.status='可预订'
                             }else {
                                 ele.status='不可预订'
                             }
                             return ele;
                         })
                         this.stayhomes = res.data;
                         this.total = res.total
                     }else {
                         this.$message.success('暂无数据')
                     }
                 }).catch(()=>{

                 })

                 // let url = URL + '/api/stayhome';
                 // let token = sessionStorage.getItem('token');
                 // let params = Object.assign({},this.paginate,this.search)
                 // axios({
                 //     method: 'GET',
                 //     url,params,
                 //     headers:{
                 //         token
                 //     }
                 // }).then(res=>{
                 //     if (res.status && res.data.code === SUCCESS){
                 //         if (res.data.data){
                 //             this.stayhomes = res.data.data;
                 //             this.total = res.data.total;
                 //         }else {
                 //             this.message.info(res.data.msg)
                 //         }
                 //     }
                 // })
             },
             handlerCurrentPageChange(val){
                 this.paginate.page = val;
                 this.initStayhome()
             },
             handlerSearch(){
                 this.paginate.page=1
                 this.initStayhome()
             },
             handleEdit(sid){
                 console.log(sid);
                 this.$router.push({path:'/stayhomeedit',query:{sid}})
             },
             handleDelete(sid){
                 stayhomeDelete(sid).then(res=>{
                     this.$message.success(res.msg)
                 }).catch(error=>{
                     this.$message.error(error.msg)
                 });
                 this.initStayhome()
             }
         },
        filters:{

        },
        mounted() {
            this.initStayhome();
        }
    }
</script>

<style scoped>

</style>