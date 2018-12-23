<template>
  <div class="support"
       :class="sizeClass">
    <i class="support-icon"
       :class="mapSupportType[type]"></i>
    <span class="support-text">{{desc}}</span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number
    },
    type: {
      type: Number
    },
    desc: {
      type: String
    }
  },
  data () {
    return {
      mapSupportType: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    sizeClass () {
      return 'size_' + this.size
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.support
  font-size: 0
  .support-icon
    display: inline-block
    border-radius: 2px
    background-repeat: no-repeat
  &.size_1
    .support-icon
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px 12px
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
  &.size_2
    .support-icon
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      &.decrease
        bg-img('decrease_2')
      &.discount
        bg-img('discount_2')
      &.guarantee
        bg-img('guarantee_2')
      &.invoice
        bg-img('invoice_2')
      &.special
        bg-img('special_2')
    .support-text
      display: inline-block
      height: 16px
      vertical-align: top
      line-height: 16px
      font-size: 12px
</style>
