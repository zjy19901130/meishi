<template>
    <div class="ratingcontent">
       <ul>
         <li v-for="rating in ratings" class="rating-item border-1px" :key="rating.rid">
           <div class="avatar">
               <img :src="rating.avatar" width="28" height="28">
           </div>
           <div class="content">
             <h1 class="name">{{ rating.user_uname }}</h1>
             <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}</span>
             </div>
             <p class="text">{{ rating.text }}</p>
             <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                <i class="mui-icon  mui-icon-extra mui-icon-extra-like"></i>
                <span class="item">{{rating.recommend}}</span>
             </div>
             <div class="time">
                         {{ rating.rateTime | dateTimeFilter  }}
              </div>
            </div>              
          </li>
       </ul>
    </div>
</template>
<script>
 import star from '@/components/star/star'
    export default {
       props: ["ratings"],
      data:function () {
         return {

         }
       },
       components:{
           star
       }
       ,
       methods:{
         
       }
    }
</script>
<style lang="scss">
   
    .ratingcontent {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0; 
                border-bottom:1px solid rgba(7, 17, 27, .1);
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img {
                        border-radius: 50%;
                    }
                } 
                .content {
                    flex: 1;
                    position: relative;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    } 
                     .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .mui-icon-extra-like, .item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .mui-icon-extra-like{
                            color: rgb(0, 160, 220);
                        }
                        .item {
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, .1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                            font-size: 9px;
                        }
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }   
                }      
            }    
     }  
</style>