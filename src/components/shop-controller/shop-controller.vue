<template>
  <div class="shop-controller">
    <transition name="move">
      <div v-show="food.count"
           class="reduce">
        <i class="inner icon-remove_circle_outline"
           @click.stop="reduceCount"></i>
      </div>
    </transition>
    <span v-show="food.count"
          class="num">{{this.food.count}}</span>
    <i class="add icon-add_circle"
       @click.stop="addCount"></i>
  </div>
</template>

<script>
import eventBus from 'common/js/event-bus.js'
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
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
    reduceCount () {
      if (this.food.count >= 1) {
        let count = this.food.count - 1
        this.$set(this.food, 'count', count)
      } else {
        this.$set(this.food, 'count', 0)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.shop-controller
  font-size: 0
  .reduce
    display: inline-block
    vertical-align: top
    transition: opacity 0.4s linear, transform 0.4s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
    .inner
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: transform 0.4s linear
      transform: rotate(0deg)
  .add
    display: inline-block
    padding: 6px
    vertical-align: top
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
  .num
    display: inline-block
    vertical-align: top
    width: 12px
    line-height: 36px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
</style>
