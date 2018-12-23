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
        <support-row v-if="seller.supports && seller.supports.length"
                     :size="1"
                     :type="seller.supports[0].type"
                     :desc="seller.supports[0].description"></support-row>
      </div>
      <div v-if="seller.supports && seller.supports.length"
           class="support-count"
           @click="controlDetail(true)">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bottom"
         @click="controlDetail(true)">
      <i class="bulletin-icon"></i>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-wrap">
      <img :src="seller.avatar"
           class="bg">
    </div>
    <transition name="fade">
      <div class="detail"
           v-if="isShowDetail">
        <div class="detail-content-wrap">
          <div class="detail-content">
            <h1 class="name">{{seller.name}}</h1>
            <div v-if="seller.score"
                 class="star-wrap">
              <stars :size="40"
                     :score="seller.score"></stars>
            </div>
            <div class="block">
              <titleLine title="优惠信息"></titleLine>
              <div class="support-wrap"
                   v-for="(support,index) in seller.supports"
                   :key="index">
                <support-row :size="2"
                             :type="support.type"
                             :desc="support.description"></support-row>
              </div>
            </div>
            <div class="block">
              <titleLine title="商家公告"></titleLine>
              <p class="bulletin">{{seller.bulletin}}</p>
            </div>

          </div>
        </div>
        <div class="close-wrap">
          <i class="icon-close"
             @click="controlDetail(false)"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Stars from '@@/stars/stars'
import SupportRow from '@@/support-row/support-row'
import TitleLine from '@@/title-line/title-line'
export default {
  components: {
    Stars,
    SupportRow,
    TitleLine
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
      isShowDetail: false
    }
  },
  methods: {
    controlDetail (flag) {
      this.isShowDetail = flag
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
    overflow: auto
    transition opacity .4s
    &.fade-enter,&.fade-leave-active
      opacity 0
    .detail-content-wrap
      padding: 64px 10%
      .detail-content
        .name
          height: 16px
          margin-bottom: 16px
          line-height: 16px
          font-size: 16px
          font-weight: 700
          text-align: center
        .star-wrap
          font-size: 0
          padding: 2px 0
          text-align: center
        .block
          .support-wrap
            margin-bottom: 12px
          .bulletin
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .close-wrap
      position: relative
      margin-top: -64px
      text-align: center
      .icon-close
        font-size: 32px
        color: rgba(255, 255, 255, 0.5)
</style>
