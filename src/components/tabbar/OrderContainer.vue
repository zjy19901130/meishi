<template>
    <div class="order-container">
        <Header :title="this.title"></Header>    
        <ul class="mui-table-view" v-for="n in 3" :key="n">
            <li class="mui-table-view-cell mui-media"  >
                <a href="#">
                    <img class="mui-media-object mui-pull-left" src="../../img/index/menu11.png">
                    <div class="mui-media-body">
                        <div class="one">
                            <span class="hotelname">季师傅菜馆 </span>
                            <span class="orderstatus">订单已取消</span>
                        </div>
                        <div class="ordertime">20118-08-29 17:26</div>
                        <div class='mui-ellipsis detais'><span>酸辣土豆丝(原价) 等4件商品</span> <span>￥28.00</span></div>
                    </div>
                    <div class="last">
                       <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">再来一单</button>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
   import  Header from "../../components/Header.vue"
    export default {
        data:function( ){
            return {
                title:"我的订单"
            }
        },
        components:{
            Header
        }
    }
</script>
<style>
    .order-container {
        margin-top:-10px;

    }
     .order-container .mui-table-view{
         font-size:14px;

     }

    .order-container .mui-table-view .mui-media{
        padding-bottom:0px;
        margin-bottom:6px;

    }

     .order-container .mui-table-view .mui-table-view-cell > a:not(.mui-btn) {
        margin-bottom:10px;

     }
     .order-container  .mui-table-view .mui-media-body{
          font-size:14px;
     }
     .order-container  .mui-table-view .mui-media-body div.one{
         display: flex;
         justify-content: space-between;

     }

    .order-container  .mui-table-view .mui-media-body div.one .hotelname{
        font-size:13px;
        font-weight: bold;
    }
     .order-container  .mui-table-view .mui-media-body div:nth-child(2){
         padding-bottom: 5px;

     }
     .order-container  .mui-table-view .mui-media-body div:last-child{
         border-top: 1px solid #c7c7cc;
         padding: 10px 0;
         display: flex;
         justify-content: space-between;
     }
     .order-container  .mui-table-view div.last{
         border-top:1px solid #c7c7cc;
         text-align: right;
     }
     .order-container  .mui-table-view div.last .mui-btn-outlined.mui-btn-primary, .mui-btn-outlined.mui-btn-blue{
         padding:2px;
         margin-top:8px;
        
     }


</style>