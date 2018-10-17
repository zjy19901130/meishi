<template>
    <div class="family-container">
        <Header></Header>
        <div class="page-navbar">
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">综合排序</mt-tab-item>
                <mt-tab-item id="2">距离最近</mt-tab-item>
                <mt-tab-item id="3">好评优先</mt-tab-item>
                <mt-tab-item id="4">配送最快</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <Recommend :list="this.familyDetailList"></Recommend>
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
</template>
<script>
    import  Header from "../Header.vue"
    import  Recommend from "../home/recommend.vue"
    export default {
        data:function () {
            return {
                selected:"1",
                fid:this.$route.params.fid,
                familyDetailList:[],
                 spaceList:[],
                scoreList:[],
                carryList:[]
            }
        },
        mounted() {
            this.getFamilyDetail();   
        },
        methods:{
            getFamilyDetail(){
                this.$http.get("family/familydetail?fid="+this.fid).then((result)=>{
                    console.log(result.body.msg);
                    if(result.body.code==1){
                        this.familyDetailList=result.body.msg;
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

                    this.spaceList=clone(this.familyDetailList);
                    this.spaceList.sort(compareS("space"));

                    this.scoreList=clone(this.familyDetailList);
                    this.scoreList.sort(compareJ("score"));

                    this.carryList=clone(this.familyDetailList);
                    this.carryList.sort(compareS("carry_time"));
                    
                });
            }
        },
        components:{
            Header,
            Recommend
        }
    }
</script>
<style>
    .family-container .mint-navbar .mint-tab-item.is-selected{
        border-bottom:5px solid #26a2ff ;      
        font-weight: bold;

    }
    .family-container  .mint-navbar{
        border-bottom:1px solid #a9acb1;
        color:black;
    }

    .family-container .mint-navbar .mint-tab-item{
          padding : 10px 0 10px 23px;
        color:#000000;
    }
    .family-container .mint-navbar .mui-icon-extra-filter{
        font-size: 12px;
    }
</style>