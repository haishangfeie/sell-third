<template>
  <div class="shopcart">
    <div class="shopcart-left">
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
            :class="{highlight:this.seller.minPrice - this.totalPrice<=0}">{{btnTxt}}</button>
  </div>
</template>

<script>
import eventBus from 'common/js/event-bus.js'
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
      dropingIndexArr: []
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
.shopcart
  position: absolute
  bottom: 0
  display: flex
  width: 100%
  height: 48px
  background-color: #07111b
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
          transition: transform 0.4s cubic-bezier(.32,-0.5,.83,.67)
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
</style>
