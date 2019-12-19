import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
import Home from '../views/Home.vue'
// 歌单详情页
// import PlayList from '../views/playList/PlayList'

import store from '../store'
import {getToken} from '../utils/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to,from,next) => {
      let token = getToken();
      if(token){
        // 查询用户详情
        store.dispatch('home/detail',token)
        .then(()=>{
          // 当获取完用户信息之后才允许跳转
          next();
        })
      } else {
        // 跳转到登录
        next({path:'/'})
      }
    }
  },
  {
    path: '/playList',
    name: 'playList',
    component: () => import('../views/playList/PlayList'),
  },
]

const router = new VueRouter({
  routes
})

export default router
