<template>
<div>
     <div class="shopcart">
         <div class="content" @click="toggleList">
            <div class="content-left" >
                <div class="logo-wrapper">
                        <div class="logo" :class="{'hightLight':totalCount>0}">
                            <span class="mui-icon mui-icon-extra  mui-icon-extra-cart" :class="{'hightLight':totalCount>0}"></span>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                 <div class="price" :class="{'hightLight':totalPrice>0}">￥{{totalPrice}}</div>
                 <div class="desc">另需配送费￥{{ deliveryPrice}}元</div>    
           </div>
            <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="totalPrice<minPrice?'not-enough':'enough'">{{payDesc}}</div>
                </div>
          </div>       
            <transition name="fold">
         <div class="shopcart-list" v-show="listShow">
             <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul style="list-style:none;padding:0px;margin:0">
                  <li class="food border-1px" v-for="food in selectFoods" :key="food.pid">
                       <span class="name">{{ food.name }}</span>
                       <div class="price">￥{{ ((food.price*100) * (food.count))/100}}</div>
                       <div class="cartcontrol-wrapper">
                             <cartctrl :food="food"></cartctrl>
                         </div>
                    </li>
                </ul>               
             </div> 
          </div>
        </transition>
    </div>
    <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import cartctrl from '@/components/cartctrl/cartctrl.vue' 
import BScroll from 'better-scroll';
import {Toast} from 'mint-ui'
export default {
  components: {
     cartctrl 
  },
  data:function(){
     return {
         fold: true    //折叠
     }
  },
  
   props: {
    selectFoods: {
         type: Array,
         default(){
             return [];
          }
    },
    deliveryPrice: {
         type: Number,
       default: 0
    },
     minPrice: {
         type: Number,
         default: 0
      }
   },
   methods:{
       hideList(){

       },
       empty(){
           this.selectFoods.forEach((food) => {
                    food.count = 0
                });
       },
      toggleList(){
        if(!this.totalCount){
           return ;
        }
        this.fold=!this.fold;
      }
      ,
       pay(){
           if(this.totalPrice<this.minPrice){
                return ;
            }
           Toast(`支付￥${this.totalPrice}元`);
       }
       
   }
,   mounted(){
    
  }
  ,
   computed:{
       listShow(){
            if(!this.totalCount){ //如果有数据
                this.fold=true;
                return false;
            }
            let show=!this.fold;
            if(show){
                this.$nextTick(()=>{
                    if(!this.scroll){   //
                        this.scroll=new BScroll(this.$refs.listContent,{
                           click:true
                       });

                    }else{
                        //重新计算better-scroll高度
                        this.scroll.refresh();
                    }
                   
                });
            }
            return show;
       },
       totalPrice(){
           let total=0;
           this.selectFoods.forEach((food)=>{           
                
                
               total+=((food.price*100)*(food.count))/100;
              
           });
            Math.formatFloat=function(f, digit) { 
               var m = Math.pow(10, digit); 
               return parseInt(f * m, 10) / m; 
           } 
           return Math.formatFloat(total, 1) ;
       },
       totalCount(){
          let count = 0;
          this.selectFoods.forEach((food) => {
             count += food.count;
          });
           return count;
       },payDesc(){
            console.log(this.minPrice-this.totalPrice-this.deliveryPrice);
           if(this.totalPrice===0){
               return `￥${this.minPrice}元起送`;
           }else if(this.totalPrice<this.minPrice){
               Math.formatFloat=function(f, digit) { 
               var m = Math.pow(10, digit); 
               return parseInt(f * m, 10) / m; 
           } 
              let diff= this.minPrice-this.totalPrice-this.deliveryPrice;
              return `还差￥${Math.formatFloat(diff, 1) }元起送`;
           }else{
              return '去结算'
           }
       }
   }        

}
</script>
<style lang="scss">
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        .content {
            display: flex;
            background: #141d27;
            font-size: 0;
            color: rgba(255, 255, 255, .4);
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    top: -10px;
                    margin: 0 16px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    background: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        &.hightLight{
                            background:rgb(0,160,220);
                        }
                        .mui-icon-extra-cart {
                            font-size: 24px;
                            line-height: 44px;
                            color: #80858a;
                             &.hightLight{
                                color:#fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                    }
                }
                .price {
                    vertical-align: top;
                    display: inline-block;
                    line-height: 24px;
                    margin-top: 12px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    font-size: 16px;
                    font-weight: 700;
                    &.hightLight{
                        color:#fff;
                    }
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0 0 10px;
                    font-size: 10px;
                }
                &.highlight {
                    .logo-wrapper {
                        .logo {
                            background: rgb(0, 160, 220);
                            .icon-shopping_cart {
                             color: #fff;
                            }
                        }
                    }
                    .price {
                        color: #fff;
                    }
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    &.not-enough {
                        background: #2b333b;
                    }
                    &.enough {
                        background: #57b400;
                        color: #fff;
                    }
                }
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                left: 32px;
                bottom: 22px;
                z-index: 200;
                .inner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgb(0, 160, 220);
                }
                &.drop-enter-active {
                    transition: all .4s cubic-bezier(.49, -0.29, .75, .41);
                    .inner {
                        transition: all .4s linear;
                    }
                }
            }
        }
        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            &.fold-enter-active, &.fold-leave-active {
                transition: all .5s;
            }
            &.fold-enter, &.fold-leave-active {
                transform: translate3d(0, 0, 0);
            }
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title {
                    float: left;
                    font-size: 14px;
                    line-height: 2;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                background: #fff;
                overflow: hidden;
                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                     border-bottom:0.5px solid rgba(7, 17, 27, .1);
                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-weight: 700;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        bottom: -5px;
                        right: 0;
                    }
                }
            }
        }
    }

    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        background: rgba(7, 17, 27, .6);
        backdrop-filter: blur(10px);
        &.fade-enter-active, .fade-leave-active {  //动画结束状态
            transition: all .5s;
        }
        .fade-enter, .fade-leave-active {   //动画开始状态
            opacity: 0
        }
    }
</style>


