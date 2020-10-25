<template>
    <div>
        <el-table :data="ordersData" stripe>
            <el-table-column prop="oid" label="订单ID"></el-table-column>
            <el-table-column prop="uid" label="用户ID"></el-table-column>
            <el-table-column prop="sid" label="民宿ID"></el-table-column>
            <el-table-column prop="enter_time" label="入住时间"></el-table-column>
            <el-table-column prop="leave_time" label="离店时间"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="user_info" label="入住人信息"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.status == '已付款'"
                            size="small"
                            type="success"
                            @click="handleComp(scope.row.oid)">完成订单</el-button>
                    <el-button
                            v-if="scope.row.status == '已完成' || scope.row.status == '已退款'"
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row.oid)">删除订单</el-button>
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
    import {ordersIndex, ordersCom, ordersDel} from "../../../http/orders";

    export default {
        name: "Index",
        data(){
            return{
                //分页
                paginate:{
                    page:1,
                    limit:5
                },
                ordersData:[],
                total:0
            }
        },
        methods:{
            initData(){
                let params = Object.assign({},this.paginate)
                ordersIndex(params).then(res=>{
                    this.ordersData = res.data
                    this.ordersData.map(ele=>{
                        if (ele.status==1){
                            ele.status='未付款'
                        }else if(ele.status==2) {
                            ele.status='已付款'
                        }else if(ele.status==3){
                            ele.status='已完成'
                        }else if(ele.status==4){
                            ele.status='已退款'
                        }
                        return ele;
                    })
                    this.total = res.count;
                    // console.log(res);
                }).catch(error=>{
                    console.log(error);
                })
            },
            handlerCurrentPageChange(val){
                this.paginate.page = val;
                this.initData()
            },
            handleComp(oid){
                ordersCom(oid).then(res=>{
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.initData();
                }).catch(error=>{
                    console.log(error);
                    this.$message.error(error)
                })
            },
            handleDelete(oid){
                ordersDel(oid).then(res=>{
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.initData();
                }).catch(error=>{
                    console.log(error);
                    this.$message.error(error)
                })
            }
        },
        mounted() {
            this.initData();
        }
    }
</script>

<style scoped>

</style>