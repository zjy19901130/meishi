<template>
    <div class="homecontainer">
        <Header :title="this.title"></Header>
        <div class="location">
            <span class="mui-icon mui-icon-location">莲花国际广场-商业楼</span>
        </div>
        <div class="search" id="search">
           <router-link to="/search"><button><span class="mui-icon mui-icon-search"></span>搜索商家、商品名称</button></router-link>
        </div>
        <!--第一部分图片轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipelist" :key="item.s_id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!--第二部分六宫格-->
       
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item in familylist" :key="item.family_id"><router-link :to="'/family/'+item.family_id">
                <span class="mui-icon"><img :src="item.img_url" alt=""></span>
                <div class="mui-media-body">{{item.name}}</div></router-link>
            </li>           
        </ul>
         <!--第三部分推荐商家-->
        <div class="recommend">
            <div class="page-navbar">
                <div class="page-title"> — &nbsp;&nbsp;推荐商家&nbsp;&nbsp; —</div>
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">综合排序</mt-tab-item>
                    <mt-tab-item id="2">距离最近</mt-tab-item>
                    <mt-tab-item id="3">好评优先</mt-tab-item>
                    <mt-tab-item id="4">配送最快</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                            <Recommend :list="this.allShopList"></Recommend>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                           <Recommend :list="this.spaceList"></Recommend>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                            <Recommend :list="this.scoreList"></Recommend>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="4">
                           <Recommend :list="this.carryList"></Recommend>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
    </div>
</template>
<script>
    import Recommend from  "../home/recommend.vue"
     import  Header from "../../components/Header.vue"
    export default {
        data:function(){
            return {
                title:"首页",
                swipelist:[
                ],
                familylist:[],
                allShopList:[],
                spaceList:[],
                scoreList:[],
                carryList:[],
                selected:"1",

            }
        },

        created(){
            this.getSwipeList();
            this.getFamilyList();
            this.getShopAllList();
        },
        mounted() {
          window.addEventListener('scroll', this.handleScroll);
        },
        methods:{
            handleScroll () {
               var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
              // console.log(scrollTop);
               var offsetTop = document.querySelector('#search').offsetTop;//元素距离顶部的距离
             // console.log(offsetTop); 
              if (scrollTop <= 40) {
                  offsetTop = 65 - Number(scrollTop);
                  document.querySelector('#search').style.top = offsetTop+'px';
               } else {
                    document.querySelector('#search').style.top = '40px';
               }           
            },
            getSwipeList() {
                this.$http.get("swipe/list").then(result => {
                    var obj = result.body;
                    if (obj.code == 1) {
                        this.swipelist = obj.msg;
                    } else {
                        Toast("数据加载失败");//脚手架
                    }
                });
            },
            getFamilyList() {
                this.$http.get("family/list").then(result => {
                    var obj = result.body;
                    if (obj.code == 1) {
                        this.familylist = obj.msg;
                    } else {
                        Toast("数据加载失败");//脚手架
                    }
                });
            },
            getShopAllList() {
                this.$http.get("indexShop/allShopList").then(result => {
                    var obj = result.body;
                    if (obj.code == 1) {
                        this.allShopList = obj.msg;
                    } else {
                        Toast("数据加载失败");//脚手架
                    }

                    function compareS(property){
                        return function(obj1,obj2){
                            var value1=obj1[property];
                            var value2=obj2[property];
                            return value1-value2;    //降序
                        }
                    }
                    function compareJ(property){
                        return function(obj1,obj2){
                            var value1=obj1[property];
                            var value2=obj2[property];
                            return value2-value1;    //升序
                        }
                    }
                    function clone(obj){
                        var newObj=[];
                        for(var key in obj){
                            newObj[key]=obj[key];
                        }
                        return newObj;
                    }

                    this.spaceList=clone(this.allShopList);
                    this.spaceList.sort(compareS("space"));

                    this.scoreList=clone(this.allShopList);
                    this.scoreList.sort(compareJ("score"));

                    this.carryList=clone(this.allShopList);
                    this.carryList.sort(compareS("carry_time"));

                });
            }
        },
        components:{
            Recommend,
            Header
        },
        destroyed () {//离开该页面需要移除这个监听的事件
         window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>
<style>
    .homecontainer{
        margin-top: -20px;
    }
    .homecontainer img{
        width:100%;
    }

    .homecontainer  .location{
        background-image:repeating-linear-gradient(to right,#01A5FA,#0788FD);

    }
    .homecontainer  .location span{
        font-size: 15px;
        color:#fff;
        height:25px;
        padding-left: 20px;
        line-height: 35px;
    }
    .homecontainer  .search{
        text-align: center;
        height: 45px;
        padding-top:6px;
        width:100%;
        background-image:repeating-linear-gradient(to right,#01A5FA,#0788FD);
        position: fixed;
        bottom:65px;
        top: 65px;/*开始处于距离顶部300px的位置，之后随着滚动条滚动top值改变，然后在top==100时停止*/
        left: 0px;
        box-sizing: border-box;
        z-index: 2;
    }
    .homecontainer  .search button{
        width:90%;
    }
    .homecontainer  .search .mui-icon{
        font-size: 15px;
    }
    .homecontainer .mui-grid-view.mui-grid-9{
        background-color: #ffffff;
    }
    .homecontainer .mui-col-xs-4{
        width:20%;
    }

    .homecontainer .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0px;
        padding:0px 11px 0px 11px ;
    }

    .homecontainer .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 12px;
    }

    .homecontainer .mint-swipe{
        height:101px;
        margin-top:40px;
    }

    .homecontainer .recommend .page-navbar .page-title{
        font-size: 14px;
        text-align: center;
        background-color: #ffffff;
    }
    .homecontainer   .mint-navbar .mint-tab-item.is-selected{
        border-bottom:5px solid #26a2ff ;      
        font-weight: bold;
    }
    .homecontainer .recommend  .mint-navbar{
        border-bottom:1px solid #a9acb1;
        color:black;
    }

    .homecontainer .recommend .mint-navbar .mint-tab-item{
        padding : 10px 0 10px 23px;
        color:#000000;
    }
    .homecontainer .recommend .mint-navbar .mui-icon-extra-filter{
        font-size: 14px;
    }
    .homecontainer .recommend  .mint-tab-container{
       height: auto;
    }


</style>