import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import Login from './views/Login.vue'
import Register from "./views/Register.vue"
import FindContainer from './components/tabbar/FindContainer.vue'
import MyContainter from './components/tabbar/MyContainter.vue'
import OrderContainer from './components/tabbar/OrderContainer.vue'
import IndexContainer from './views/Index.vue'
import ProductDetail from "./components/products/ProductsDetail.vue"
import Search from "./components/search/Search.vue"
import Family from "./components/family/family.vue"
import userInfo from "./components/user/userInfo"

import Goods from "./components/goods/goods.vue"
import Seller from "./components/seller/seller.vue"
import Ratings from "./components/ratings/ratings"
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
  routes: [
      {  path: '/', redirect: "/index" },
      { path: '/index', component: IndexContainer ,children:[
              { path: '/',  component:HomeContainer },
              { path: '/home',  component:HomeContainer },
              { path: '/order',  component:OrderContainer  },
              { path: '/find',  component:FindContainer  },
              { path: '/my',  component:MyContainter },
      ] },

      { path: '/login',  component:Login },
      { path: '/register',  component:Register },
      { path: '/products/detail/:shop_id',  component:ProductDetail ,children:[
        { path: '/',  component:Goods },
        { path: '/goods', component: Goods },
        { path: '/ratings',  component:Ratings  },
        { path: '/seller',  component:Seller  }
      ]

      },
      { path: '/search',  component:Search},
      { path: '/family/:fid',  component:Family},
      { path: '/userinfo',  component:userInfo},
  ]
})
