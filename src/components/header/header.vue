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
  </div>
</template>

<script>
export default {
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
  width: 100%
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
    height: 28px
    padding: 0 12px
    font-size: 0
    background-color: rgba(7, 17, 27, 0.2)
    .bulletin-icon, .bulletin, .icon-keyboard_arrow_right
      vertical-align: top
    .bulletin-icon
      width: 22px
      height: 12px
      margin-right: 4px
      background-size: 22px 12px
      background-repeat: no-repeat
      bg-img('bulletin')
    .bulletin
      margin-right: 4px
      line-height: 28px
      font-size: 10px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .icon-keyboard_arrow_right
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
</style>
