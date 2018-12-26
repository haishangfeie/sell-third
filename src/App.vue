<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-header">
      <router-link class="tab-header-item"
                   :to="{name:'goods'}">商品</router-link>
      <router-link class="tab-header-item"
                   :to="{name:'ratings'}">评价</router-link>
      <router-link class="tab-header-item"
                   :to="{name:'seller'}">商家</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from '@@/header/header'
const NoError = 0
export default {
  components: {
    VHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/apis/seller')
      .then(res => {
        if (res.data.errno === NoError) {
          this.seller = res.data.data
        } else {
          this.seller = {}
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl'
#app
  width: 100%
  box-sizing: border-box
  padding-top: 134px
  .tab-header
    display: flex
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-header-item
      flex: 1
      text-align: center
      font-size: 14px
      height: 40px
      line-height: 40px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
