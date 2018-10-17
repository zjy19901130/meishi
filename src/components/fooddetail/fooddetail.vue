<template>   
   <transition name="move">
     <div class="food" v-show="showFlag" ref="food">
        <div class="content-wrapper">
            <div class="image-header">
                <img :src="food.md_img">
                <div class="back" @click="goback">
                   <span class="mui-icon mui-icon-back"></span>
                </div>
            </div>
              <div class="content">
                    <h1 class="title">{{ food.name }}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{ food.pro_sales }}</span>
                        <span class="rating">好评率{{ food.opinion }}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{ food.price }}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartctrl :food="food"></cartctrl>
                    </div>
                </div>
        </div>
     </div> 
   </transition>
</template>

<script>
 import cartctrl from '@/components/cartctrl/cartctrl.vue'
 import BScroll from 'better-scroll';
export default {
    props:{
        food:{
            type:Object
        },
        
    },
    data:function(){
        return {
            showFlag:false,
        }
    },
    mounted(){
        //console.log(this.food);
    },
  components: {
    cartctrl
  },
  methods:{
      show(){
          this.showFlag=true;
          this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        // 重新计算
                        this.scroll.refresh();
                    }
          });
      },
      goback(){
         this.showFlag=false;
      }
  }
}
</script>
<style lang="scss">
     .food{   
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff; 
         &.move-enter-active, &.move-leave-active {
            transition: all .2s linear;
        }
        &.move-enter, &.move-leave-active {
            transform: translate3d(100%, 0, 0);
        }         
       .content-wrapper{
           .image-header{
               position:relative;
               width:100%;
               height:0;
               padding-top:100%;
               img{
                   position:absolute;
                   top:0;
                   left:0;
                   width:100%;
                   height:100%;
               }
                .back {
                    width:30px;
                    height:30px;
                    border-radius:30px;
                    background:#988e8e;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    .mui-icon{   
                        position: absolute;
                        top:50%;
                        left:50%;
                        margin-top:-10px;
                        margin-left:-10px;
                        display: block;
                        font-size: 20px;
                        color: #fff;
                    }
                }
           }
      
       }
         .content {
                padding: 18px;
                position: relative;
                .title {
                    line-height: 14px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(7, 17, 27);
                }
                .detail {
                    margin-bottom: 18px;
                    line-height: 10px;
                    height: 10px;
                    font-size: 0;
                    .sell-count, .rating {
                        font-size: 10px;;
                        color: rgb(147, 153, 159);
                    }
                    .sell-count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
         }
     }
</style>

