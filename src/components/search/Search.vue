<template>
    <div class="search">
        <Header></Header>
        <div class="search-top">
            <span class="mui-icon mui-icon-search"></span> <input type="text" placeholder="请输入商家、商品名称"><span>&nbsp;&nbsp;搜索</span>
        </div>
        <div class="search-bottom">

        </div>
    </div>
</template>
<script>
    import  Header from "../Header.vue"
    export default {
        data:function () {
            return {}
        },methods:{

        },components:{
            Header
        }
    }
</script>
<style>
    .search{
        background:#ffffff;
        height:800px;
    }
    .search .search-top{
        text-align: center;
    }
    .search .search-top input{
        width:80%;
        height:30px;
        margin-top:10px;
        padding-left: 30px;
        background:#F2F2F2;
        font-size: 10px;
        position: relative;
    }
    .search .search-top span{
        font-size: 13px;
        font-weight:bold;
    }
    .search .search-top .mui-icon-search{
        position: relative;
        left:20px;
        z-index: 1;
    }
</style>