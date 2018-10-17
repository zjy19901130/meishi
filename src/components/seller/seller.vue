<template>
  <div class="seller">
      <div class="remark">
          <div class="title">
            配送信息
          </div>
          <div class="info">
              <p>由蜂鸟快送提供配送,约{{shop.carry_time}}分钟送达，距离5.0km</p>
              <p>配送费￥{{shop.carry_cost}}</p>
          </div>
      </div>
      <split></split>
      <div class="promotion">
          <div class="title">
              活动与服务
          </div>
          <div class="content">
              <img src="./decrease_4@2x.png" alt="">
              {{shop.promotion}}   
          </div>
      </div>
      <split></split>
      <div class="shopinfo">
          <div class="title">
             商家信息
          </div>
          <div class="address">
              <div class="addtitle">地址</div> 
              <div calss="addcontent">{{shop.address}}</div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
 import split from '@/components/split/split';
export default {
  props:["shop"],
  components: {
    split
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .seller {
        font-size:12px;
       .remark{ 
          padding:18px;
         .title{
            font-size:20px; 
            font-weight:700;
            margin:25px 0px;
         }
       }
       .promotion{ 
          padding:18px;
         .title{
            font-size:20px; 
            font-weight:700;
            margin:25px 0px;
         }
         .content{
            img{
               width:20px;
               height:20px;
               vertical-align: top;
            }
         }
       }
       .shopinfo{
           padding:18px;
          .title{
            font-size:20px; 
            font-weight:700;
            margin:25px 0px;
          }
          .address{
            display: flex;
            justify-content: space-between;
            border-top:1px solid rgba(7, 17, 27, .1);
            border-bottom:1px solid rgba(7, 17, 27, .1);
            padding:8px 0;
            .addtitle{
              font-weight: bold;  
              font-size: 15px;           
            }
          }
       }
    }
</style>


