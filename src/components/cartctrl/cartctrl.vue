<template>
  <div class="cartctrl">
        <transition name="move">
            <div class="cart-reduce" v-show="food.count>0" @click.stop.prevent="reduceCart($event)" transition="move"> 
                <img class="inner" src="../../img/products/reduce.png" width="24px" heihgt="24px">
            </div>
        </transition>
      <div class="cart-count" v-show="food.count>0">
          {{food.count}}
      </div>
      <div class="cart-add" @click.stop.prevent="addCart($event)"><img src="../../img/products/add.png" width="24px" heihgt="24px">
         
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
       food:{
         type:Object
       } 
    },
  components: {

  },
  created(){
           
  },
  methods:{
      addCart(event){
          if(!event._constructed){
              return;
          }
          if(!this.food.count){
              // 添加food不存在的字段时 需要调用vue.set方法添加，这样才可以通过vue观测到这个字段的变化
              Vue.set(this.food, 'count', 1);
          }else{
              this.food.count++;
          }
          //Bus.$emit('cart.add', event.target);
      },
       reduceCart(event) {
                // 防止多次被点击
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                  //  console.log(1111);
                    this.food.count--;
                }
            }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .cartctrl{
        font-size: 0;
        .cart-reduce {
            display: inline-block;
            padding: 6px;
             &.move-enter-active, &.move-leave-active {
                transition: all .5s;
                transform: translate3d(0, 0, 0);
                img{
                    transition: all .5s;
                    transform: rotate(0deg);
                }
            }
            &.move-enter, &.move-leave-active {
                opacity: 0;
                transform: translate3d(24px, 0, 0);
               img{
                    transform: rotate(180deg);
                }
            }
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-add {
            display: inline-block;
            padding: 6px;
            color: rgb(0, 160, 220);
        }
    }
</style>
