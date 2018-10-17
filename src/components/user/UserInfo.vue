<template>
  <div class="userInfo">
      <Header :title="this.title"></Header>
			<div class="cell"  @click="updateUserImg">
			   <span>头像</span>
				 <span  class="arrow"><img :src="userInfo.u_img"></img></span>
				 
             <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" name="userImg"/>
					 
			</div> 
			<div class="cell">
			    <span>用户名</span>
				  <p class="arrow">{{userInfo.uname}}</p>
			</div>
			<div class="set-title">账号绑定</div>
			<div class="cell">
			    <span><span class="mui-icon mui-icon-extra mui-icon-extra-phone"></span>手机</span>
				  <p class="arrow">{{userInfo.phone}}</p>
			</div>
			<div class="set-title">安全设置</div>
			<div class="cell">
			    <span class="logUpwd">登录密码</span>
				  <p class="arrow">未设置</p>
			</div>	
			<div class="quit" @click="quitLogin">
			   退出登录
			</div>		
  </div>
</template>
<script>
  import  Header from "../../components/Header.vue"
  export default {
        data:function(){
            return {
							title:"账户信息",
							userInfo:{},
							photo:"",
							uid:this.$store.getters.getUid
						}
        },
			
				mounted() {
						this.getUserInfo();
				},
        components:{
            Header
        },
				methods:{					 
					 getUserInfo(){
						 this.$http.get("user/userInfo?uid="+this.uid).then(result=>{
							  var data=result.body;
								if(data.code==1){
									this.userInfo=result.body.msg;	
								}
						 });
					 },
					 quitLogin(){
               this.$store.commit("set_login",false);  
							 this.$store.commit("set_uid","");
							 this.$router.push("/my");
					 },
					 updateUserImg: function () {
                $('.hiddenInput').click();	
							
            },
						handleFile: function (e) {
							  	 var files = e.target.files ||e.dataTransfer.files;
     							 if (!files.length)return;
      						 this.photo = files[0];
									 var formdata = new FormData();
									 formdata.append('file',this.photo);
									 formdata.append('uid',this.uid);
								 	this.$http.post('user/upload', formdata,{ //通过调取node端定义的接口，切记一定要将请求头中的Content-Type改为multipart/form-data否则node端获取到的将是一个字符串
                      headers:{
                           'Content-Type':'multipart/form-data'
                      }
                 })
                .then((result)=>{
								  	var code =result.body.code;
									  if(code==1){
												this.getUserInfo();
										}
								});
							 

            }					

				}
    }
</script>
<style>
    .userInfo .cell{
		 	background:#fff;
		 	display:flex;
		   justify-content:space-between;
			 height:50px;
			 line-height:50px;
			 border-bottom:1px solid #ddd;
			 align-items:center;
			 padding:0px 20px;
			 font-size:16px;
			 font-weight:bold;
		}

		.arrow{
			display:flex;
			justify-content: space-between;
			align-items:center;
			padding-right:10px;

     } 
		.arrow::after{
			content:"";
			width:10px;
			height:10px;
			border-top: 1px solid #797979;
			border-right:1px solid #797979;
			transform:rotate(45deg);
		}
		 .userInfo .cell img{
			 	border-radius:50px;
				 width:50px;
				 height:50px;
		 }
		 .userInfo .cell .hiddenInput,form{
			  display: none;
		 }{
			 	border-radius:50px;
				 width:50px;
				 height:50px;
		 }
		 .userInfo  div:nth-child(2){		 
			 height:65px;
			 line-height:65px;
		 }
		 .userInfo .set-title{
			 padding:0px 20px;
			 height:30px;
			 line-height:30px;
			 font-size:13px;
			 color:#6d6d6d;
		 }
		 .userInfo  .mui-icon{
			 color:#109ade;
			 vertical-align:middle;
		 }
		 .userInfo p{
			 margin:0px;
		 }
		 .userInfo  .quit{
			 text-align:center;
			 background:#fff;
			 height:50px;
			 margin-top:20px;
			 line-height:50px;
			 color:red;
			 font-weight:bold;
		 }
		 .userInfo  div:nth-child(7) span.logUpwd{		
			 font-weight:normal;
		 }
		 .userInfo  div:nth-child(7) p{		
			 color:#109ade;
		 }
</style>