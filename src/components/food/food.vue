<template>
  <div class="food">
    <div class="header">
      <div class="image"
           :style="{'background-image':`url(${food.image})`}"></div>
      <div class="content">
        <h1 class="name">{{food.name}}</h1>
        <div class="desc">
          <span class="sell">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price-wrap">
          <div class="price">
            <span>￥</span>{{food.price}}
          </div>
          <div v-if="food.oldPrice"
               class="old-price">
            <span class="yuan">￥</span>{{food.oldPrice}}
          </div>
        </div>
        <transition name="fade">
          <div @click="addCount"
               v-if="!food.count"
               class="shop-btn">加入购物车</div>
        </transition>
        <div class="shop-controller-wrap">
          <shop-controller :food="food"></shop-controller>
        </div>
      </div>
      <i @click="hide"
         class="icon-arrow_lift back"></i>
    </div>
    <gap></gap>
    <div class="info-wrap">
      <h2 class="info-title">商品介紹</h2>
      <p class="info">{{food.info}}</p>
    </div>
    <gap></gap>
    <div class="ratings-wrap">
      <h2 class="ratings-title">商品评价</h2>
      <div class="ratings-content">
        <ratings-filter :ratings="food.ratings"
                        :rateType="rateType"
                        :onlyContent="onlyContent"
                        @update-rateType="updateRateType"
                        @update-only-content="updateOnlyContent"></ratings-filter>
        <div class="content">
          <ul>
            <li v-for="(rating,index) in filterRatings"
                :key="index"
                class="rating-card">
              <div class="user">
                <span class="username">{{rating.username}}</span>
                <img :src="rating.avatar"
                     alt=""
                     class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <div class="rating">
                <i class="rating-icon"
                   :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                <span class="rating-text">{{rating.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from 'common/js/event-bus'
import shopController from '@@/shop-controller/shop-controller'
import gap from '@@/gap/gap'
import ratingsFilter from '@@/ratings-filter/ratings-filter'
import formatDate from 'common/js/formatDate'
const ALL = 2
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      rateType: ALL,
      onlyContent: false
    }
  },
  filters: {
    formatDate (timestamp) {
      return formatDate(new Date(timestamp), 'YYYY-MM-DD HH:mm')
    }
  },
  components: {
    shopController,
    gap,
    ratingsFilter
  },
  methods: {
    addCount (e) {
      if (this.food.count) {
        let count = this.food.count < 99 ? (this.food.count + 1) : 99
        this.$set(this.food, 'count', count)
      } else {
        this.$set(this.food, 'count', 1)
      }
      // 避免小球动画与滚动动画同时执行
      this.$nextTick(() => {
        eventBus.$emit('drop', e.target)
      })
    },
    updateRateType (rateType) {
      this.rateType = rateType
    },
    updateOnlyContent (onlyContent) {
      this.onlyContent = onlyContent
    },
    hide () {
      this.$emit('hide-food-detail')
    }
  },
  computed: {
    filterRatings () {
      let ratings = this.food.ratings
      if (this.rateType !== ALL) {
        ratings = ratings.filter(rating => {
          return rating.rateType === this.rateType
        })
      }
      if (this.onlyContent) {
        ratings = ratings.filter(rating => {
          return !!rating.text
        })
      }
      return ratings
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.food
  height: 100%
  box-sizing: border-box
  padding-bottom: 48px
  background-color: #fff
  z-index: 300
  overflow: auto
  .header
    position: relative
    .image
      width: 100%
      padding-top: 100%
      background-size: 100% 100%
      background-repeat: no-repeat
    .content
      position: relative
      padding: 18px
      .name
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
        margin-bottom: 8px
      .desc
        height: 10px
        font-size: 0
        color: rgb(147, 153, 159)
        margin-bottom: 18px
        .sell
          font-size: 10px
          line-height: 10px
          margin-right: 8px
        .rating
          line-height: 10px
          font-size: 10px
      .price-wrap
        height: 24px
        font-size: 0
        .price
          display: inline-block
          margin-right: 8px
          font-size: 14px
          line-height: 24px
          font-weight: 700
          color: rgb(240, 20, 20)
          .yuan
            font-size: 10px
            line-height: 24px
            font-weight: 400
        .old-price
          display: inline-block
          font-size: 10px
          line-height: 24px
          font-weight: 700
          color: rgb(147, 153, 159)
          text-decoration: line-through
          .yuan
            line-height: 24px
            font-weight: 400
      .shop-btn
        position: absolute
        right: 18px
        bottom: 18px
        width: 74px
        height: 24px
        line-height: 24px
        font-size: 10px
        color: #fff
        text-align: center
        border-radius: 12px
        background-color: #00a0dc
        transition: opacity 0.4s
        z-index: 1
        &.fade-enter, &.fade-leave-active
          opacity: 0
      .shop-controller-wrap
        position: absolute
        right: 12px
        bottom: 12px
    .back
      position: absolute
      top: 10px
      left: 2px
      padding: 8px
      font-size: 26px
      color: rgba(255, 255, 255, 0.8)
  .info-wrap
    padding: 18px
    .info-title
      margin-bottom: 6px
      height: 14px
      font-size: 14px
      line-height: 14px
      color: #07111b
    .info
      padding: 0 8px
      font-size: 12px
      line-height: 24px
      color: #4d555d
  .ratings-wrap
    padding: 18px 0
    .ratings-title
      padding: 0 18px
      margin-bottom: 18px
      height: 14px
      font-size: 14px
      line-height: 14px
      color: #07111b
    .ratings-content
      .content
        border-top: 1px solid rgba(7, 17, 27, 0.1)
      .rating-card
        padding: 16px 0
        margin: 0 18px
        color: rgb(147, 153, 159)
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          float: right
          margin-right: 18px
          .username
            margin-right: 6px
            line-height: 12px
            font-size: 10px
          .avatar
            width: 12px
            height: 12px
            border-radius: 50%
        .time
          margin-bottom: 6px
          line-height: 10px
          font-size: 10px
        .rating-icon
          vertical-align: top
          margin-right: 4px
          font-size: 12px
          line-height: 16px
        .rating-text
          vertical-align: top
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 16px
</style>
