<template>
  <div class="ratings">
         <div class="ratings-header">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ shop.score }}</h1>
                    <div class="title">综合评分</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="shop.serviceScore"></star>
                        <span class="score">{{ shop.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="shop.foodScore"></star>
                        <span class="score">{{ shop.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ shop.carry_time }}分钟</span>
                    </div>
                </div>
            </div>                      
         </div>
         <split></split>
       
          <div class="ratingselect">
            <div class="page-navbar">
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">全部<span class="count"></span></mt-tab-item>
                    <mt-tab-item id="2">满意<span class="count"></span></mt-tab-item>
                    <mt-tab-item id="3">不满意<span class="count"></span></mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                          <ratingcontent :ratings="this.ratings"></ratingcontent>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                         <ratingcontent :ratings="this.manyi"></ratingcontent>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <ratingcontent :ratings="this.nomanyi"></ratingcontent>
                    </mt-tab-container-item>                   
                </mt-tab-container>
            </div>
        </div>        
    </div>
</template>

<script>
 import star from '@/components/star/star';
 import split from '@/components/split/split';
import  ratingcontent from '@/components/ratings/children/ratingcontent';
export default {
  props: 
  {
    shop: {
         type: Object,
         default(){
             return {};
          }
    },
  },
  data(){
    return {
      ratings:[],
      selected:"1",
      manyi:[],
      nomanyi:[]
    }
  },
  components: {
       star,
       split,
       ratingcontent
  },
  mounted(){
     this.getRatings();
  },
  methods:{
     getRatings() {
        this.$http.get("ratings/list").then((result)=>{          
            if(result.body.code==1){
              this.ratings=result.body.msg;              
            }
           
               for(var i=0;i<this.ratings.length;i++){
                  if(this.ratings[i].rateType==1){
                     this.manyi.push(this.ratings[i]);
                  }
                   if(this.ratings[i].rateType==2){
                     this.nomanyi.push(this.ratings[i]);
                  }
               }
                 
            
                   
                                                                                                                                                                                                                                                                                                                           });
     }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../common/scss/mixins"; 
    .mint-navbar{
       display:flex;
       justify-content: flex-start;
      .mint-tab-item{
           flex:0;
           background:rgba(0, 160, 220, .2);
           margin:10px 10px;
           padding:11px 0;
       }
    }
    .ratingselect   .mint-navbar .mint-tab-item.is-selected{     
         border: none;
         background: rgb(0, 160, 220);      
    }
     .ratings {
        position: absolute;
        top: 290px;
        width: 100%;
        background:#fff;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, .1);
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 6px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .score {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery {
                        margin-left: 12px;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
       
     }
     
    </style>

