<template>
  <div class="ratings">
    <div class="header">
      <div class="left">
        <div class="score">{{seller.score}}</div>
        <div class="text">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <div class="item">
          <div class="text">服务态度</div>
          <div class="stars-wrap">
            <stars v-if="seller.score"
                   :size="30"
                   :score="seller.score"></stars>
          </div>
          <div class="score">{{seller.score}}</div>
        </div>
        <div class="item">
          <div class="text">服务态度</div>
          <div class="stars-wrap">
            <stars v-if="seller.serviceScore"
                   :size="30"
                   :score="seller.serviceScore"></stars>
          </div>
          <div class="score">{{seller.serviceScore}}</div>
        </div>
        <div class="item">
          <div class="text">送达时间</div>
          <div class="delivery-time">{{seller.deliveryPrice}}分钟</div>
        </div>
      </div>
    </div>
    <gap></gap>
    <div class="ratings-content">
      <div class="ratings-filter-wrap">
        <ratings-filter :ratings="ratings"
                        :rateType="rateType"
                        :onlyContent="onlyContent"
                        @update-rateType="updateRateType"
                        @update-only-content="updateOnlyContent"></ratings-filter>
      </div>
      <div class="rating-cards">
        <div class="rating-card"
             v-for="(rating,index) in filterRatings"
             :key="index">
          <div class="left">
            <img :src="rating.avatar"
                 alt=""
                 class="avatar">
          </div>
          <div class="right">
            <div class="username">{{rating.username}}</div>
            <div class="stars-delivery">
              <div class="stars-wrap">
                <stars v-if="rating.score"
                       :size="20"
                       :score="rating.score"></stars>
              </div>
              <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <div class="text">{{rating.text}}</div>
            <div class="recommend-wrap">
              <i class="icon-thumb" :class="rating.rateType ===0 ? 'icon-thumb_up' : 'icon-thumb_down' "></i>
              <div class="recommend-item"
                   v-for="(item,index) in rating.recommend"
                   :key="index">{{item | strLen(5)}}</div>
            </div>
            <div class="date">{{rating.rateTime | formatDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Gap from '@@/gap/gap'
import Stars from '@@/stars/stars'
import RatingsFilter from '@@/ratings-filter/ratings-filter'
import formatDate from 'common/js/formatDate'
const IsSuccess = 0
const ALL = 2
export default {
  components: {
    Stars,
    Gap,
    RatingsFilter
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      ratings: [],
      rateType: ALL,
      onlyContent: false
    }
  },
  created () {
    this.$http.get('/apis/ratings')
      .then(res => {
        if (res.data.errorno === IsSuccess) {
          this.ratings = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    updateRateType (rateType) {
      this.rateType = rateType
    },
    updateOnlyContent (onlyContent) {
      this.onlyContent = onlyContent
    }
  },
  filters: {
    formatDate (timestamp) {
      return formatDate(new Date(timestamp), 'YYYY-MM-DD HH:mm')
    },
    strLen (str, len) {
      return str.length > len ? str.slice(0, len) + '...' : str
    }
  },
  computed: {
    filterRatings () {
      let ratings = this.ratings
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
.ratings
  .header
    display: flex
    padding: 18px 0
    .left
      width: 138px
      flex: 0 0 138px
      padding: 6px 0
      text-align: center
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      @media screen and (max-width: 350px)
        flex: 0 0 115px
        width: 115px
      .score
        margin-bottom: 6px
        line-height: 24px
        font-size: 24px
        color: #ff9900
      .text
        margin-bottom: 8px
        font-size: 12px
        line-height: 12px
        color: #07111b
      .rankRate
        font-size: 10px
        line-height: 10px
        color: #93999f
    .right
      flex: 1
      padding-left: 25px
      @media screen and (max-width: 350px)
        padding-left: 5px
      .item
        font-size: 0
        height: 15px
        margin-bottom: 8px
        &:last-of-type
          margin-bottom: 0
        .text
          vertical-align: top
          display: inline-block
          margin-right: 17px
          line-height: 15px
          font-size: 12px
          color: #07111b
        .stars-wrap
          vertical-align: top
          display: inline-block
          margin-right: 12px
          height: 15px
        .score
          vertical-align: top
          display: inline-block
          line-height: 15px
          font-size: 12px
          color: #ff9900
        .delivery-time
          display: inline-block
          height: 12px
          font-size: 12px
          line-height: 14px
          color: #93999f
  .ratings-content
    padding: 36px 0
    .ratings-filter-wrap
      border-1px(rgba(7, 17, 27, 0.1))
    .rating-cards
      .rating-card
        display: flex
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .left
          width: 28px
          flex: 0 0 28px
          margin-right: 12px
          .avatar
            width: 28px
            height: 28px
            border-radius: 50%
        .right
          position: relative
          flex: 1
          .username
            height: 10px
            font-size: 10px
            line-height: 10px
            color: #07111b
            margin-bottom: 6px
          .stars-delivery
            font-size: 0
            margin-bottom: 6px
            .stars-wrap
              display: inline-block
              margin-right: 7px
            .delivery-time
              font-size: 10px
              line-height: 10px
              color: #93999f
          .text
            color: #07111b
            line-height: 18px
            font-size: 12px
          .recommend-wrap
            font-size: 0
            .icon-thumb
              display: inline-block
              vertical-align: top
              font-size: 12px
              line-height: 18px
              margin-right: 8px
              &.icon-thumb_up
                color: rgb(0, 160, 220)
              &.icon-thumb_down
                color: rgb(183, 187, 191)
            .recommend-item
              vertical-align: top
              display: inline-block
              padding: 0 6px
              height: 18px
              margin-right: 8px
              line-height: 18px
              font-size: 9px
              border-radius: 1px
              border: solid 1px rgba(7, 17, 27, 0.1)
              color: rgb(147, 153, 159)
              margin-bottom: 6px
              &:last-of-type
                margin-right: 0
          .date
            position: absolute
            right: 0
            top: 0
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
</style>
