<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
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
#app
  width: 100%
  box-sizing: border-box
</style>
