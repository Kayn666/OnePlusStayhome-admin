<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
/*html,body{*/
/*  height: 100%;*/
/*}*/
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*height: 100%;*/
}
a{
  color: #333333;
}
.el-table__header-wrapper{
  height: 50px;
}
.el-table__header-wrapper thead{
  height: 50px;
}
.el-table__header-wrapper thead tr{
  height: 50px;
}
.el-table__header-wrapper thead tr th div{
  height: 50px;
}
.el-table__header-wrapper thead tr th{
  height: 50px;
  line-height: 50px;
}
.el-form--inline{
  height: 50px;
}
.el-form--inline .el-form-item{
  height: 50px;
}
.el-form--inline .el-form-item .el-form-item__label{
  position: relative;
  bottom: 60px;
}
.cell{
  text-align: center;
}
</style>
