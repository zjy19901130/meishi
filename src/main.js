
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//1.1加载模块 vueResource(发送ajax请求)
import VueResource  from 'vue-resource'
//1.2将VueRsource 加载vue
Vue.use(VueResource);
Vue.http.options.root="http://127.0.0.1:3000/";
/*import {Header,Button,Swipe,SwipeItem,Navbar,TabItem,Cell,TabContainer,TabContainerItem} from 'mint-ui'
//1.5注册组件
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Navbar.name,Navbar);
Vue.component(TabItem.name,TabItem);
Vue.component(Cell.name,Cell);
Vue.component(TabContainer.name,TabContainer);
Vue.component(TabContainerItem.name,TabContainerItem);*/
import MintUI from "mint-ui"
Vue.use(MintUI);
//1.6 引入mui css

import Vuex from "vuex"
Vue.use(Vuex)
//3。创建vuex实例【共享数据，提供操作数据方法，获取数据方法】
var store = new Vuex.Store({
    state:{
        //专门用来存储共享数据，想象组件data
        //如果在组件中操作，this.$store.state.****方法
        //购物车中数量共享数据
        count:0,
        isLogin: false,
        uid:"",
    },
    mutations:{
        //注意操作共享数据只能通过 mutations提供方法
        //如果组件想调用mutations只能使用
        //this.$store.commit("increment");
        increment(state){
            state.count++;
        },
        substract(state){
          if(state.count>0){
            state.count--;
          }
        },
        //设置登录状态
        set_login(state, platform) {
            state.isLogin = platform;
        },
        set_uid(state, platform) {
            state.uid = platform;
        },

    },
    getters:{
        //getters只负责对外提供数据，不负责修改数据
        //在组件模板中{{$store.getters.optCount}}
        optCount:function(state){
            return state.count;
        },
        getLogin:function (state){
            return state.isLogin;
        } ,
        getUid:function(state){
            return state.uid;
        }
    }
}); //得到一个数据仓储对象


import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"
//1.7引入mint-ui所需样式文件
import "mint-ui/lib/style.css"
import $ from 'jquery'
window.$=$;
Vue.config.productionTip = false
Vue.filter("dateTimeFilter",function(val){
    var val=new Date(val);
    var y=val.getFullYear();
    var m=val.getMonth()+1;
    m<10&&(m="0"+m);
    var d=val.getDate();
    d<10&&(d="0"+d);

    var h=val.getHours();
    var am=h<12?"上午":"下午";
    h>12&&(h-=12);
    h<10&&(h="0"+h);
    var M=val.getMinutes();
    M<10&&(M="0"+M);
    return `${y}-${m}-${d} ${h}:${M}`;
});
new Vue({ 
  router,
  render: h => h(App),
  store
}).$mount('#app')
