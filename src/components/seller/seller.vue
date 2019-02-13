<template>
  <div class="seller">
    <div class="header">
      <h1 class="name">{{seller.name}}</h1>
      <div class="base-info">
        <div class="stars-wrap">
          <stars v-if="seller.score"
                 :size="30"
                 :score="seller.score"></stars>
        </div>
        <span class="rating-count">({{ seller.ratingCount }})</span>
        <span class="sell-count">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="other-info">
        <li class="info-item min-price">
          <p class="text">起送价</p>
          <div class="value-wrap">
            <span class="value price">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="info-item delivery-price">
          <p class="text">商家配送</p>
          <div class="value-wrap">
            <span class="value price">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="info-item delivery-time">
          <p class="text">平均配送时间</p>
          <div class="value-wrap">
            <span class="value time">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
    </div>
    <gap></gap>
    <div class="bulletin-supports-wrap">
      <h2 class="title">公共与活动</h2>
      <p class="bulletin">{{seller.bulletin}}</p>
      <ul class="supports">
        <li class="item"
            v-for="(support,index) in seller.supports"
            :key="index">
          <support-row :size="2"
                       :type="support.type"
                       :desc="support.description"></support-row>
        </li>
      </ul>
    </div>
    <gap></gap>
    <div class="seller-pics-wrap">
      <h2 class="title">商家实景</h2>
      <div class="ul-wrap"
           ref="ulWrap">
        <ul class="pics"
            ref="pics">
          <li class="pic-item pic-item-hook"
              v-for="(pic,index) in seller.pics"
              :key="index">
            <img width="120"
                 height="90"
                 :src="pic"
                 alt=""
                 class="pic">
          </li>
        </ul>
      </div>
    </div>
    <gap></gap>
    <div class="seller-info">
      <h2 class="title">商家信息</h2>
      <ul class="infos">
        <li v-for="(info,index) in seller.infos"
            :key="index"
            class="info-item">
          {{info}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Stars from '@@/stars/stars'
import Gap from '@@/gap/gap'
import SupportRow from '@@/support-row/support-row'
import BScroll from 'better-scroll'
export default {
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    Stars,
    Gap,
    SupportRow
  },
  watch: {
    seller (val) {
      if (this.seller.pics && this.seller.pics.length) {
        this.$nextTick(() => {
          let pics = this.$refs.pics
          const picWidth = pics.getElementsByClassName('pic-item-hook')[0].offsetWidth
          const mr = 6
          this.$refs.pics.style.width = `${picWidth * this.seller.pics.length + mr * (this.seller.pics.length - 1)}px`
          this.$nextTick(() => {
            this.picsScroll = new BScroll(this.$refs.ulWrap, {
              scrollX: true
            })
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.seller
  .header
    padding: 18px
    .name
      font-size: 14px
      line-height: 14px
      color: #07111b
      margin-bottom: 8px
    .base-info
      font-size: 0
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .stars-wrap
        vertical-align: top
        display: inline-block
        margin-right: 8px
        height: 15px
      .rating-count, .sell-count
        vertical-align: top
        display: inline-block
        margin-right: 12px
        color: #4d555d
        font-size: 10px
        line-height: 15px
    .other-info
      display: flex
      padding-top: 18px
      .info-item
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-of-type
          border-right: none
        .text
          height: 10px
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: #93999f
        .value-wrap
          font-size: 10px
          line-height: 24px
          color: rgb(7, 17, 27)
          .value
            font-size: 24px
  .bulletin-supports-wrap
    padding: 18px
    .title
      font-size: 14px
      line-height: 14px
      color: #07111b
      margin-bottom: 8px
    .bulletin
      padding: 0 12px 16px
      font-size: 12px
      line-height: 24px
      border-1px(rgba(7, 17, 27, 0.1))
      color: rgb(220, 20, 20)
    .supports
      .item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
  .seller-pics-wrap
    padding: 18px
    .title
      font-size: 14px
      line-height: 14px
      color: #07111b
      margin-bottom: 12px
    .ul-wrap
      overflow: hidden
      .pics
        white-space: nowrap
        .pic-item
          display: inline-block
          margin-right: 6px
  .seller-info
    padding: 18px
    .title
      font-size: 14px
      line-height: 14px
      color: #07111b
      padding-bottom: 12px
      border-1px(rgba(7, 17, 27, 0.1))
    .infos
      .info-item
        padding: 16px 12px
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
</style>
