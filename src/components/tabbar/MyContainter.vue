<template>
    <div class="my-container">
		   <Header :title="this.title"></Header>  
        <!--头部-->
				 <div class="my-header arrow" v-if="!islogin" @click="goLogin()">  
				   <a>       
							<img src="../../img/login/loginname.png">                     
							<div>
								<h4>登录/注册</h4>
								<h5><span class="mui-icon mui-icon-extra mui-icon-extra-phone"></span>登录后享受更多的特权</h5>
							</div>		
						</a> 						
        </div>
				<div class="my-header arrow" v-else @click="goUserInfo()">  
				   <a>       
							<img :src="userInfo.u_img">                      
							<div>
								<h4>{{userInfo.uname}}</h4>
								<h5><span class="mui-icon mui-icon-extra mui-icon-extra-phone"></span>
								{{userInfo.phone}}</h5>
							</div>		
						</a> 						
        </div>
				<ul class="my-grid">
				 	 <li>
						  <a href="#">
                <div class="circle"><span class="mui-icon mui-icon-extra mui-icon-extra-prech"></span></div>
                钱包
							</a>
						</li>
						 <li>
						 <a href="#">
                <div class="circle gift"><span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span></div>
                红包</a>
						</li>
						 <li>
						 <a href="#">
                <div class="circle gold"> <span class="mui-icon mui-icon-extra mui-icon-extra-gold"></span></div>
                金币</a>
						</li>
				</ul>
        <div class="my-details arrow">
						<div>
							<span class="mui-icon mui-icon-location-filled"></span>我的地址
						</div>		
        </div>
				<div class="my-details arrow">
						<div>
								<img src="../../img/login/money.jpg">金币商城
						</div>		
        </div>
				<div class="my-details arrow">
						<div> 
							 	<span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>我的客服
						</div>		
        </div>
				<div class="my-details arrow">
						<div>
							<img src="../../img/login/my.jpg">蚂蚁钻石会员特权
						</div>		
        </div>
    </div>
</template>
<script>
   import  Header from "../../components/Header.vue"
	  
		
    export default {
        data:function(){
            return {
							title:"我的",
							islogin:this.$store.getters.getLogin,      
							userInfo:{},
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
						 var uid=this.$store.getters.getUid;
						 this.$http.get("user/userInfo?uid="+uid).then(result=>{
							  var data=result.body;
								if(data.code==1){
									this.userInfo=result.body.msg;	
								}
						 });
					 },
					 goLogin(){
						 this.$router.push("/login");
					 },
					 goUserInfo(){
						 this.$router.push("/userInfo");
					 }
				}
    }
</script>
<style>
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
			border-top:2px solid #ddd;
			border-right:2px solid #ddd;
			transform:rotate(45deg);
		}

    .my-container{
        margin-top: -20px;
    }

		/*头部 */
    .my-container .my-header{
        width:100%;
				height:100px;
				background-image:repeating-linear-gradient(to right,#00ABFF,#0085FE);
				color:#fff;
				display:flex;
    }
		.my-container .my-header>a{
			display:block;
			display:flex;
			justify-content:center;
			align-items:center;
			margin:0 20px;
		}
		 .my-container .my-header img{
			 	   width:60px;
					 height:60px;
					 border-radius:80px;
					 margin-right:15px;
		 }
  .my-container .my-header	h4{
		   
		    color:#fff;
		   
		 		margin-bottom:10px;
	 }
	 .my-container .my-header	h5{
		    font-size:13px;
		    color:#fff;
		    margin-top:8px;
		 		margin-bottom:-4px;
	 }
	 .my-container .my-header	h5 .mui-icon-extra{
		  font-size:16px;
		  color:#fff;
	  	vertical-align:middle;
	 }
     /*三宫格 */  
	  .my-container .my-grid{
			  list-style:none;
				display:flex;
				justify-content:center;
				align-items:center;
				padding:0px;
				margin:0px;		
				font-size:15px;
				color:black;	
		}
    .my-container .my-grid li{
        background-color: #ffffff;
				width:33.33333%;
				height:100px;
				border:1px solid #ddd;
				display:flex;
				justify-content:center;
				align-items:center;		
    }
		.my-container .my-grid  .mui-icon{
       font-size:15px;
       color: #ffffff;
			 padding:3px;
    }
    .my-container .my-grid  div.circle{
       border-radius: 30px;
       width:30px; 
       height:30px;
       background:#FF8339;
       line-height: 30px;  
			 text-align:center;    
   }

    .my-container .my-grid  div.gift{
       background:#FF3243;
   }
   .my-container .my-grid   div.gold{
       background:#2EFF20;
   }


    .my-container  .my-details{
        background-color: #EFEFF4;
				border:1px solid #ddd;
    }
    
   /* 详情 */
	.my-container .my-details{
				width:100%;
				height:45px;
				background:#fff;
				margin-top:10px;
				padding:15px  10px ;
				font-size:16px;
	}
  .my-container .my-details  .mui-icon-location-filled,.mui-icon-extra-custom{
		color:#0085FE;
	}
   
.my-container .my-details img{
   vertical-align:middle;
   width:30px;
	 margin-left:-5px;
	 height:30px;
}
</style>