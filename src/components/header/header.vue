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
          <i class="icon"></i>
          <span class="desc">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="header-bottom"></div>
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
  }
}
</script>

<style lang="stylus" scoped>
.header
  position: absolute
  top: 0
  left: 0
  width: 100%
  background-color: #ccc
  .header-top
    display: flex
    padding: 24px 12px 18px 24px
    .avatar
      flex: 0 0 64px
      width: 64px
      height: 64px
      margin-right 16px
      border-radius: 2px
      .content
        flex:1
  .header-bottom
    height: 28px
    padding: 0 12px
</style>
