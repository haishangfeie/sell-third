<template>
  <div class="shopcart-wrap">
    <div class="shopcart">
      <div class="shopcart-left"
           @click="toggleShopList">
        <div class="shopcart-img-wrap">
          <i class="icon-shopping_cart"
             :class="{highlight:totalCount}"></i>
          <span v-show="totalCount"
                class="count">{{totalCount}}</span>
          <transition @before-enter="beforeDrop"
                      @enter="droping"
                      @after-enter="afterDrop"
                      :css="false"
                      v-for="(ball,index) in balls"
                      :key="index">
            <div v-if="ball"
                 class="ball-wrap">
              <div class="ball ball-hock"></div>
            </div>
          </transition>
        </div>
        <span class="calc-money"
              :class="{highlight:totalPrice}">￥{{totalPrice}}</span>
        <span class="delivery-price">另需配送费{{seller.deliveryPrice}}元</span>
      </div>
      <button class="shopcart-right"
              :class="{highlight:this.seller.minPrice - this.totalPrice<=0}" @click="toPay">{{btnTxt}}</button>
    </div>
    <transition name="slide">
      <div v-if="isShowShopList"
           class="shop-list"
           @click.self="toggleShopList">
        <div class="list-main">
          <div class="list-header">
            <h3 class="title">购物车</h3>
            <span class="clear"
                  @click="cleanShopcartList">清空</span>
          </div>
          <div class="list-content"
               ref="shopListContent">
            <ul>
              <li class="food"
                  v-for="(food,index) in shopFoods"
                  :key="index">
                <div class="name">{{food.name}}</div>
                <div class="price">
                  <span class="yuan">￥</span>{{food.price}}</div>
                <div class="shop-controller-wrap">
                  <shop-controller :food="food"></shop-controller>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
import eventBus from 'common/js/event-bus.js'
import ShopController from '@@/shop-controller/shop-controller'
export default {
  props: {
    seller: {
      type: Object
    },
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    eventBus.$on('drop', (el) => {
      this.ballPos = this._calaBallStartPos(el)
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i]) {
          this.$set(this.balls, i, true)
          this.dropingIndexArr.push(i)
          break
        }
      }
    })
  },
  data () {
    return {
      balls: [false, false, false, false, false],
      ballPos: {},
      dropingIndexArr: [],
      isHopeShowShopList: false
    }
  },
  components: {
    ShopController
  },
  watch: {
    isShowShopList (flag) {
      if (flag) {
        this.$nextTick(() => {
          let shopListContent = this.$refs.shopListContent
          this.shopListContentScroll = new BScroll(shopListContent, {
            click: true
          })
        })
      }
    }
  },
  computed: {
    totalPrice () {
      let price = 0
      this.goods.forEach(good => {
        let foods = good.foods
        foods.forEach(food => {
          if (food.count) {
            price += food.count * food.price
          }
        })
      })
      return price
    },
    totalCount () {
      let count = 0
      this.goods.forEach(goodsItem => {
        goodsItem.foods.forEach(food => {
          if (food.count) {
            count += food.count
          }
        })
      })
      return count
    },
    btnTxt () {
      if (this.totalPrice === 0) {
        return `￥${this.seller.minPrice}起送`
      } else if (this.seller.minPrice - this.totalPrice > 0) {
        return `还差￥${this.seller.minPrice - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    },
    shopFoods () {
      let foods = []
      this.goods.forEach(goodsItem => {
        goodsItem.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    isShowShopList () {
      if (!this.shopFoods.length) {
        return false
      }
      let flag = this.isHopeShowShopList
      return flag
    }
  },
  methods: {
    beforeDrop (el) {
      el.style.transform = `translate3d(${this.ballPos.x}px,0,0)`
      el.style.webkitTransform = `translate3d(${this.ballPos.x}px,0,0)`
      let ball = el.getElementsByClassName('ball-hock')[0]
      ball.style.transform = `translate3d(0,${-this.ballPos.y}px,0)`
      ball.style.webkitTransform = `translate3d(0,${-this.ballPos.y}px,0)`
    },
    droping (el, done) {
      // 强制页面重绘
      /* eslint-disable */
      let ref = el.offsetHeight
      el.style.transform = `translate3d(0,0,0)`
      el.style.webkitTransform = `translate3d(0,0,0)`
      this.$nextTick(() => {
        let ball = el.getElementsByClassName('ball-hock')[0]
        ball.style.transform = `translate3d(0,0,0)`
        ball.style.webkitTransform = `translate3d(0,0,0)`
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let index = this.dropingIndexArr.shift()
      this.$set(this.balls, index, false)
    },
    toggleShopList() {
      if (!this.shopFoods.length) {
        this.isHopeShowShopList = false
      } else {
        this.isHopeShowShopList = !this.isHopeShowShopList
      }
    },
    cleanShopcartList() {
      this.goods.forEach(goodsItem => {
        goodsItem.foods.forEach(food => {
          food.count = 0
        })
      })
    },
    toPay(){
      if(this.totalPrice<this.seller.minPrice){
        return;
      }
      alert(`请支付￥${this.totalPrice}`)
    },
    _calaBallStartPos(el) {
      let rect = el.getBoundingClientRect()
      let distanceY = window.innerHeight - rect.top - 48
      let distanceX = rect.left - 28
      return {
        x: distanceX,
        y: distanceY
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.shopcart-wrap
  position: relative
  z-index: 500
  .shopcart
    position: fixed
    bottom: 0
    display: flex
    width: 100%
    height: 48px
    background-color: #07111b
    z-index: 200
    .shopcart-left
      position: relative
      flex: 1
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .shopcart-img-wrap
        position: absolute
        left: 18px
        bottom: 2px
        padding: 6px
        background-color: #07111b
        border-radius: 50%
        .icon-shopping_cart
          display: block
          width: 44px
          height: 44px
          text-align: center
          line-height: 44px
          font-size: 24px
          border-radius: 50%
          background-color: rgba(255, 255, 255, 0.1)
          &.highlight
            background-color: #00a0dc
            color: #fff
        .count
          position: absolute
          right: 0
          top: 0
          width: 24px
          height: 16px
          line-height: 16px
          font-size: 9px
          font-weight: 700
          background-color: #f01414
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          border-radius: 8px
          color: #fff
          text-align: center
        .ball-wrap
          position: absolute
          left: 50%
          top: 50%
          margin-left: -8px
          margin-top: -8px
          transition: transform 0.4s linear
          .ball
            border-radius: 50%
            width: 16px
            height: 16px
            background-color: #00a0dc
            transition: transform 0.4s cubic-bezier(0.14, -0.38, 0.91, 0.56)
      .calc-money
        display: inline-block
        height: 24px
        margin: 12px 12px 12px 80px
        padding-right: 12px
        line-height: 24px
        font-size: 16px
        font-weight: 700
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color: #fff
      .delivery-price
        font-size: 10px
        line-height: 48px
    .shopcart-right
      flex: 0 0 105px
      width: 105px
      height: 100%
      color: rgba(255, 255, 255, 0.4)
      background-color: #2b333b
      font-size: 12px
      line-height: 48px
      font-weight: 700
      &.highlight
        background-color: #00b43c
        color: #fff
  .shop-list
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: rgba(7, 17, 27, 0.6)
    z-index: 100
    backdrop-filter: blur(10px)
    transition: opacity 0.4s
    &.slide-enter, &.slide-leave-active
      opacity: 0
      .list-main
        transform: translate3d(0, 100%, 0)
    .list-main
      position: absolute
      bottom: 48px
      width: 100%
      background-color: #fff
      transition: transform 0.4s
      .list-header
        height: 40px
        padding: 0 18px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 40px
        .clear
          position: absolute
          right: 18px
          top: 0
          font-size: 12px
          color: rgb(0, 160, 200)
          line-height: 40px
      .list-content
        overflow: hidden
        max-height: 218px
        margin: 0 18px
        .food
          position: relative
          height: 48px
          line-height: 48px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 102px
            top: 0
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
            .yuan
              font-size: 10px
              font-weight: 400
          .shop-controller-wrap
            position: absolute
            right: 18px
            top: 6px
</style>
