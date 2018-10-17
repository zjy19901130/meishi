<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in allPro" class="menu-item" :key="index"  :class="{'current': currentIndex === index}"
             @click="selectMenu(index, $event)">
              <span class="text">
                  {{ item.pro_family_name }}
               </span>
            </li>
        </ul>          
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
          <ul>
                <li v-for="(item,index) in allPro" class="food-list food-list-hook" :key="index">
                    <h1 class="title">{{ item.pro_family_name }}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item" @click="selectFood(food,$event)"
                          >
                            <div class="icon">
                                <img :src="food.img_url" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{ food.name }}</h2>
                                <p class="desc">{{ food.pro_details}}</p>
                                <div class="extra">
                                    <span class="count">月售{{ food.pro_sales }}份</span><span>好评率{{ food.opinion }}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{ food.price.toFixed(2) }}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                      <cartctrl :food="food"></cartctrl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
    </div>    
    <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="deliveryPrice" :minPrice="minPrice"></shopcart>
    
    <fooddetail :food="selectedFood" ref="food"></fooddetail>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
 import BScroll from 'better-scroll';
 import shopcart from '@/components/shopcart/shopcart.vue';
 import cartctrl from '@/components/cartctrl/cartctrl.vue'
 import fooddetail from '@/components/fooddetail/fooddetail.vue';
export default {
   props:["shop_id","deliveryPrice","minPrice"],
    data:function(){
            return {
                 products:{},
                 proFamily:{},
                 allPro:[],
                 listHeight: [],  //每一个区间的高度
                 scrollY: 0,
                 selectedFood: {}
            }
   },
  components: {
     shopcart,
      cartctrl,
      fooddetail
  },
  created(){
   
  },
  mounted(){
       this.getProFamily();
      this.getProducts();
    // console.log(this.proFamily);
     // console.log(this.products);
      
  }
  ,computed:{
       currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
          selectFoods() {
                let foods = [];
                this.allPro.forEach((good) => {
                   
                    good.foods.forEach((food) => {
                     
                        if (food.count!==0&&food.count!==null) {
                            foods.push(food);
                        }
                    });
                });
              
                return foods;
        }
  }
  ,
  methods:{
      selectFood(food,event){
          
            if (!event._constructed) {
                    return;
           }
          this.selectedFood = food;
          this.$refs.food.show();     
      },
      selectMenu(index, event){
          if (!event._constructed) {
                    return;
                }
                // 获取食物的li Dom节点列表
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                // 调用better-scroll 方法滚动到响应位置
                this.foodScroll.scrollToElement(el, 300);
      },
      _calculateHeight(){
          let foodList=this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
          let height=0;
          this.listHeight.push(height);
          for(let i =0;i<foodList.length;i++){
             let item=foodList[i];   
             height+=item.clientHeight;
             this.listHeight.push(height);
          }
      }
      ,
       _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.foodWrapper, {
                    click: true,
                    probeType: 3 // 监测实时滚动的位置
                });

                this.foodScroll.on('scroll', (pos) => {
                    // 拿到实时的y坐标
                    this.scrollY = Math.abs(Math.round(pos.y));//转换为正值
                })
      },
      getProFamily(){
        this.$http.get("shopdetails/foods?shop_id="+this.shop_id).then((result)=>{
           
            this.proFamily=result.body.msg;
        });
      },
      getProducts() {
          this.$http.get("shopdetails/products?shop_id="+this.shop_id).then(result=>{
                this.products=result.body.msg; 
                 //console.log(this.products);
                // console.log(this.proFamily);
                var all=[];                
                 for(var i=0;i<this.proFamily.length;i++ ){                          
                            var arrPro ={};
                            var arr=this.proFamily[i].pro_family_name; 
                            var proArr=[];                           
                            for(var j=0;j<this.products.length;j++){
                                if(arr==this.products[j].pro_family_name){
                                    proArr.push(this.products[j]);                                     
                                }                       
                            }
                            all.push({"pro_family_name":arr,"foods":proArr});
                       
                 }
                   
                  this.allPro=all;
                //  console.log(this.allPro)
                  this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                 });
            
           });
       },
  }
}
</script>
<style lang="scss">

  .goods {
        display: flex;
        position: absolute;
        top: 290px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            width: 80px;
            flex: 0 0 80px;
            background: #f3f5f7;
            ul{
                padding:0px;
                margin:0px;
             .menu-item{
                display: table;
                height: 54px;
                width: 80px;
                line-height: 14px;
                padding:0px 12px;
                &.current{
                    position:relative;
                    z-index: 10;
                    margin-top:-1;
                    background:#fff;
                    font-weight: 700;
                }
                .text {
                    display: table-cell;
                    width: 70px;
                    vertical-align: middle;
                    font-size: 12px;
                }
              }
            }
           
        }
        .foods-wrapper{
            flex:1;
            ul{
              background:#fff;
              list-style: none;
              padding:0px;
              margin:0px; 
              .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
             }
              .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                 border-bottom:0.5px solid #d9dde1;
                &:last-child {
                    border-bottom:none;
                    margin-bottom: 0;
                }
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                       position: relative;
                    .name {
                        margin: 2px 0 8px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc,
                    .extra {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        line-height: 10px;
                        .count {
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
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: -15px;
                    }
                }
            }
           }
        }
  }
</style>


