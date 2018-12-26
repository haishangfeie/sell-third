import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@@/goods/goods'
import Ratings from '@@/ratings/ratings'
import Seller from '@@/seller/seller'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods,
      name: 'goods'
    },
    {
      path: '/ratings',
      component: Ratings,
      name: 'ratings'
    },
    {
      path: '/seller',
      component: Seller,
      name: 'seller'
    }
  ]
})
