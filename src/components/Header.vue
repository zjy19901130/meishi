<template>
    <div class="header-container">
        <mt-header fixed>
            <mt-button icon="back" slot="left" @click="goBack">{{title}}</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    </div>
</template>
<script>

    export default {
        props:["title"],
      data:function () {
        return {

        }
      },methods:{
          goBack(){
              this.$router.push("/home");
          }
        }
    }
</script>
<style>
    .header-container{
        padding-bottom:20px;
    }
    .header-container .mint-header-title{
        color:black;
        font-weight: bold;
    }
    .header-container .mint-header{
        background-color: #ffffff;
        border-bottom:1px solid #C7CACF;
    }
    .header-container .mint-header .mint-button{
        color:#000000;
    
    }
</style>