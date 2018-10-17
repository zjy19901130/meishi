<template>
    <div class="footer">
        <nav class="mui-bar mui-bar-tab">          
            <div class="mui-tab-item" v-for="(item,index) of list"  :key="item.id"   :class="{active:istrue==index}"  @click="remove(index,item.to)">
                <span :class="item.icon"></span>
                <span class="mui-tab-label">{{item.name}}</span>
            </div>
        </nav>
    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                istrue:0,
               list:[{id:1,name:"首页",to:"/home",icon:"mui-icon mui-icon-home"},
                     {id:2,name:"发现",to:"/find",icon:"mui-icon mui-icon-extra mui-icon-extra-find"},
                     {id:3,name:"订单",to:"/order",icon:"mui-icon mui-icon-extra  mui-icon-extra-cart"},
                     {id:4,name:"我的",to:"/my",icon:"mui-icon  mui-icon-person-filled"}]    
            }
        },
        created(){
        },
        mounted() {
          
        },
        methods:{
            remove(index,to){
               this.istrue=index;
               this.$router.push(to);
            }
        }
    }
</script>
<style>
   /* a:active, a:hover{
        color:#007aff !important;      
    }*/
    .active{
        color:#007aff !important;   
    }

</style>
