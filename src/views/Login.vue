<template>
  <div class="login-container">   
      <Header :title="this.title"></Header>      
      <div>
        <div class="login-input">
            <input id='phone' type="text" class="mui-input-clear mui-input" placeholder="手机号" name="phone" v-model="phone">
        </div>    
        <div class="login-input">
            <input id='upwd' type="text" class="mui-input-clear mui-input" placeholder="密码" v-model="upwd">
        </div>
        <div>
          温馨提示：未注册账号的手机号，登录时将自动注册，且代表已同意<a href="#">《用户服务协议》</a>
        </div>
        <button @click="signin">
             登录
        </button>
     </div>   
  </div>
</template>
<script>
   import {Toast} from "mint-ui";
   import  Header from "../components/Header.vue"
   export default {
        data:function(){
            return {
              title:"登录",
              phone:"",
              upwd:"",
            
            }
        },
        components:{
            Header
        },mounted() {
            /*登陆 */

        },        
        methods:{
           signin(){
             var phone=this.phone;
             var upwd=this.upwd;
             var regPhone=/^[1]{1}[0-9]{10}$/;
             if(!regPhone.test(phone)){                
                Toast("请输入正确的手机号");
                return;
             }
             var regUpwd=/^[\w]{6,12}$/;
              if(!regUpwd.test(upwd)){                
                Toast("请输入6-12密码,可包含数字字母下划线");
                return;
             }
             
             this.$http.post("user/signin",{
                phone,upwd
             },{emulateJSON: true}
             ).then(result=>{
                  var code=result.body.code;
                  if(code==1){
                      this.$store.commit("set_login",true);                    
                      var uid=result.body.msg[0].uid;                   
                      this.$store.commit("set_uid",uid);
                      this.$router.push("/my");
                  }
             });
           }
        }
    }
</script>
<style>
    .login-container{
        background:#fff;
        padding-bottom:460px;
    }
    .login-container>div:nth-child(2){
        padding-top:25px;
        display:flex;
        direction:column;
        flex-wrap:wrap;
        justify-content:center;
        direction:column;
        align-items:center;
        padding-top:20px;
    }
    .login-container  .login-input{     
      width:70%;
      text-align:center;
     
    }

    .login-container  input{
      margin-bottom:10px; 
      color:#6A6A6A;
      font-size:10px;
    }

     .login-container>div:nth-child(2)>div:nth-child(3){
        width:70%;
        font-size:13px;
        color:#6A6A6A;
     }
     .login-container>div:nth-child(2)>button{
       color:#fff;
       width:70%;
       background:#03B21A;
       margin-top:20px;
     }
</style>

