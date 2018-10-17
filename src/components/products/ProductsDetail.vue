<template>
    <div class="product-container"  ref="product-container">
        <Header :title="shop.shopname"></Header>
        <div class="product-body">
            <div>
                <img :src="shop.img_url" alt="">
            </div>
            <div class="pro-title">              
                <h3>{{shop.shopname}}</h3>
                <div>评价{{shop.score}} 月售{{shop.sold_count}}单 蜂鸟专送约{{shop.carry_time}}分钟</div>
                <div>
                    <span class="man">满减</span>  <span class='mui-ellipsis'>{{shop.promotion}}</span>
                </div>
                <div class='mui-ellipsis'>公告：门店生意火爆，经常大排长龙，高峰期请提前订餐,避免人多，耽误您的时间</div>
            </div>
             <div class="tab" ref="tab">
                <div class="tab-item">
                    <router-link to="/goods">商品</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/ratings">评论</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/seller">商家</router-link>
                </div>
            </div>
            <keep-alive>
                <router-view :shop_id="this.shop_id" :deliveryPrice="shop.carry_cost" :minPrice="shop.origin_cost" :shop="shop"></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import  Header from "../../components/Header.vue"
    import BScroll from 'better-scroll';
    export default {
        data:function( ){
            return {
                selected:"1",
                shop_id:this.$route.params.shop_id,                
                shop:{},
                cartList:{}
            }
        },components:{
            Header,
         
        },
        created(){
           
          /*  this.getCartList();         */  
            
        },
        mounted(){
             this.getShop();
            //console.log(this.shop_id);        
            
             
        },
        methods: {
          
          
           getShop() {
                this.$http.get("shopdetails/shop?shop_id="+this.shop_id).then(result=>{
                    this.shop=result.body.msg[0];
                   // console.log(this.shop); 
                  
              });
            },        
           
        }
    }
</script>
<style lang="scss">    
  
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 100%;
            border-top: 2px solid rgba(7, 17, 27, 0.1);
         }
        .tab-item {
            flex: 1;
            text-align: center;

            & > a {
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);

                &.router-link-exact-active.router-link-active {
                    color: rgb(240, 20, 20)
                }
            }
        }
    }
    .product-body{
          background:#ffffff;
    }
    .product-body  img{
        border-radius:3px;
    }
    
   .product-body>div:first-child{
        width:100%;
        height:100px;
        background-image:url("../../img/products/bg.png");
        background-repeat: no-repeat;
        background-size:100% 100%;
        position:relative;
    }
    .product-body>div:first-child img{
        width:70px;
        height:70px;
        position:absolute;
        left:50%;
        bottom:-15px;
        margin-left:-35px;
       
        box-shadow:1px 1px;
    }
    .product-body .pro-title{
        padding:18px 15px 0px 15px;
        text-align: center;
        font-size: 12px;
    }
    .product-body .pro-title h3{
        font-size: 20px;
        font-weight:bold;

    }
    .product-body .page-navbar  .mint-tab-container{
        overflow: visible;
    }
    .product-body .pro-title .man{
        border:1px solid #888888;
        font-size: 3px;
        padding:0px;
        border-radius: 2px;
        background-color: #FF4645;
        color: #ffffff;
        border:0px ;
        border-radius: 3px;
        padding:2px;
    }

    .product-body .mint-navbar .mint-tab-item.is-selected{
        color:#000000;

    }
    .product-body  .mint-navbar{
        border-bottom:1px solid #a9acb1;
        color:black;
    }

    .product-body .mint-navbar .mint-tab-item{

        color:#000000;
    }
    .product-body .mint-navbar .mui-icon-extra-filter{
        font-size: 12px;
    }
   
</style>