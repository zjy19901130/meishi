<template>
    <div class="find-container">
        <Header :title="this.title"></Header>
        <div class="find-title">
            <div class="top">—&nbsp;为你推荐&nbsp;—</div>
            <div class="bottom">你的口味，我都懂得</div>
        </div>
        <div class="goods-list">
            <div class="goods-item" v-for="n in 10" :key="n">
                <img src="../../img/products/md/01.jpg" alt="">
                <div class="info">
                    <h1 class="title">草莓酸奶/中杯</h1>
                    <div>
                        月售29份  好评率100%
                    </div>
                    <div class="price">
                        <span class="now">￥15.00</span>
                    </div>
                    <div class="sell">
                        <span>CoCo都可(东兰路店)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import  Header from "../../components/Header.vue"
    import {Toast} from "mint-ui"
    export default {
        data:function( ){
            return {
                title:"为你推荐",
                list:[],
                pno:1
            }
        },
        components:{
            Header
        },
        created() {

        } ,methods:{


        }
    }
</script>
<style>
    /**商品列表样式处理*/
    /**商品列表最外层样式*/
    .find-container{
        margin-top: -20px;
    }
    .find-container .find-title .top ,.bottom{
        display:flex;
        justify-content: center;

    }
    .find-container .find-title .top{
        font-weight: bold;
        margin-top:8px;
    }
    .find-container .find-title .bottom{
        font-size: 12px;
    }

    .goods-list{
        display:flex;
        flex-wrap:wrap;
        padding:7px;
        justify-content: space-between;
    }

    .goods-list .goods-item{
        width:49%;
        border :1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 280px;
    }
    .goods-list .goods-item img{
        width:100%;
    }
    .goods-list .goods-item  .title{
        font-size: 14px;
        font-weight: bold; 
    }
    .goods-list .goods-item .info{
        background: #F7F7F7;
        font-size: 14px;
    }
    .goods-list .goods-item .info .price {
        color:red;
        font-weight: bold;
        font-size: 16px;
        border-bottom:1px  dashed   #D9D9D9;

    }
    .goods-list .goods-item .info .sell{
        display:flex;
        justify-content: space-between;
        font-size: 14px;
        padding:5px 0;
    }
</style>