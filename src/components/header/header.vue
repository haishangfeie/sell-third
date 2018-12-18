<template>
  <div class="header">
    <div class="header-top">
      <img :src="seller.avatar"
           class="avatar">
      <div class="content">
        <h1 class="name-wrap">
          <i class="brand"></i>
          <span class="name">{{seller.name}}</span>
        </h1>
        <p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div class="support"
             v-if="seller.supports && seller.supports.length">
          <i class="support-icon"
             :class="mapSupportType[seller.supports[0].type]"></i>
          <span class="support-text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports && seller.supports.length"
           class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bottom">
      <i class="bulletin-icon"></i>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-wrap">
      <img :src="seller.avatar"
           class="bg">
    </div>
    <div class="detail">
      <div class="detail-content-wrap">
        <div class="detail-content">
          <h1 class="name">{{seller.name}}</h1>
          <stars></stars>
        </div>
      </div>
      <div class="close-wrap">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '@@/stars/stars'
export default {
  components: {
    Stars
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
      mapSupportType: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position: absolute
  top: 0
  left: 0
  right: 0
  background-color: rgba(7, 17, 27, 0.5)
  color: #fff
  .header-top
    position: relative
    display: flex
    padding: 24px 12px 18px 24px
    .avatar
      flex: 0 0 64px
      width: 64px
      height: 64px
      margin-right: 16px
      border-radius: 2px
    .content
      flex: 1
      .name-wrap
        font-size: 0
        margin-bottom: 8px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          margin-right: 6px
          bg-img('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
          border-radius: 2px
        .name
          height: 18px
          vertical-align: top
          line-height: 18px
          font-size: 16px
          font-weight: 700
      .desc
        height: 12px
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
      .support
        font-size: 0
        .support-icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          border-radius: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.guarantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
          &.special
            bg-img('special_1')
        .support-text
          display: inline-block
          height: 12px
          vertical-align: top
          line-height: 12px
          font-size: 10px
    .support-count
      position: absolute
      bottom: 15px
      right: 12px
      height: 12px
      padding: 7px 8px
      font-size: 0
      background-color: rgba(0, 0, 0, 0.2)
      border-radius: 13px
      .count
        vertical-align: top
        margin-right: 2px
        line-height: 12px
        font-size: 10px
      .icon-keyboard_arrow_right
        vertical-align: top
        line-height: 12px
        font-size: 10px
  .header-bottom
    display: flex
    height: 28px
    padding: 0 12px
    font-size: 0
    background-color: rgba(7, 17, 27, 0.2)
    align-items: center
    .bulletin-icon
      flex: 0 0 22px
      width: 22px
      height: 12px
      margin-right: 4px
      background-size: 22px 12px
      background-repeat: no-repeat
      bg-img('bulletin')
    .bulletin
      flex: 1
      height: 12px
      margin-right: 4px
      font-size: 10px
      line-height: 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .icon-keyboard_arrow_right
      flex: 0 0 10px
      width: 10px
      height: 12px
      line-height: 12px
      font-size: 10px
  .bg-wrap
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 134px
    z-index: -1
    overflow: hidden
    .bg
      width: 100%
      height: 100%
      filter: blur(10px)
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.8)
    backdrop-filter: blur(10px)
    .detail-content-wrap
      padding: 64px 0
      .detail-content
        .name
          height: 16px
          margin-bottom: 16px
          line-height: 16px
          font-size: 16px
          font-weight: 700
          text-align: center
    .close-wrap
      position: relative
      margin-top: -64px
      text-align: center
      .icon-close
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)
</style>
