<template>
    <div class="rec-container">
        <ul class="mui-table-view" >
            <li class="mui-table-view-cell mui-media" v-for="shop in list" :key="shop.shop_id">
                <router-link :to="'/products/detail/'+shop.shop_id">
                    <img class="mui-media-object mui-pull-left"  :src="shop.img_url">
                    <div class="mui-media-body">
                        <h5 class="title">{{shop.shopname}}</h5>
                        <table class="details">
                            <tr>
                                <td>
                                   <!-- <div class="icons mui-inline" style="margin-left: 6px;">
                                        <i data-index="1" class="mui-icon mui-icon-star-filled"></i>
                                        <i data-index="2" class="mui-icon mui-icon-star-filled"></i>
                                        <i data-index="3" class="mui-icon mui-icon-star-filled"></i>
                                        <i data-index="4" class="mui-icon mui-icon-star-filled"></i>
                                        <i data-index="5" class="mui-icon mui-icon-star-filled"></i>
                                    </div>-->
                                    <div calss="star">
                                        <star :size="24" :score="shop.score" style="width:50px;"></star>
                                        <span>{{shop.score}} &nbsp;月售{{shop.sold_count}}单</span>
                                    </div>                                    
                                </td>
                                <td>
                                    <mt-button type="primary" size="small">蜂鸟专送</mt-button>
                                </td>
                            </tr>
                            <tr>
                                <td>￥{{shop.origin_cost}}起送|优惠配送费￥{{shop.carry_cost}}</td>
                                <td>{{shop.space}}m|{{shop.carry_time}}分钟1</td>
                            </tr>
                            <tr>
                                <td colspan="2"><span class="kuang">简餐</span>&nbsp;&nbsp;<span class="kuang">最近光顾</span>&nbsp;&nbsp;<span class="kuang">品质联盟</span></td>
                            </tr>
                            <tr>
                                <td  class="mui-ellipsis" id="promotion"><span class="kuang man">满</span> {{shop.promotion}}</td>
                                <td>{{shop.promotion | numberfilter()}}个活动</td>
                            </tr>
                        </table>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import Vue from "vue"
   import star from '@/components/star/star';
    Vue.filter("numberfilter",function(promotion){
        var number=promotion.match(/满/g).length;
        return   number;
    });

    export default {
        props:["list"],
        data:function(){
            return {

            }
        },
        created(){

        },
        mounted() {
            
        },
        methods:{

        },
        components:{
           star
        }
    }
</script>
<style>
     
     .rec-container .mui-table-view  .mui-table-view-cell{
         font-size:12px;
     }
    .rec-container .mui-table-view  .mui-table-view-cell h5 {
        font-weight: bold;
        color: #000000;
        font-size: 12px;
        margin: 2px;
    }

    .rec-container .mui-table-view  .mui-table-view-cell  .details{
      
        color:#585858;
        width:100%;

    }
    .rec-container .mui-table-view  .mui-table-view-cell  .details span.kuang {
        border:1px solid #888888;
      
        padding:0px;
        border-radius: 2px;

    }
    .rec-container .mui-table-view  .mui-table-view-cell  .details span.man {
        background-color: #FF4645;
        color: #ffffff;
        border:0px ;
        border-radius: 3px;
        padding:2px;

    }
    .rec-container   .details .mint-button{
        width:60px;
        height:15px;
        line-height: 17px;
        margin-right:0px;
        text-align: center;      
        padding: 0;
    }

    .rec-container   .details>tr td:last-child{
        text-align: right;
    }
    .rec-container   .details>tr td:first-child{
        text-align: left;
    }


    .rec-container .mui-table-view  .mui-table-view-cell .star{
        display:inline;      
    }
    

    table tr td:first-child{
        width:70%;
    }
    table tr td:last-child{
        width:29%;
    }
    .rec-container .mui-table-view  .mui-table-view-cell  .details #promotion{
        width:100%;
    }
</style>