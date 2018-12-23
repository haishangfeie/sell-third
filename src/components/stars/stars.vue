<template>
  <div class="stars">
    <span v-for="(star,index) in starArr"
          :key="index"
          class="star"
          :class="[sizeClass,star]"></span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {
      starArr: []
    }
  },
  mounted () {
    this.initStar()
  },
  methods: {
    initStar () {
      let score = this.score
      let arr = []
      score = Math.floor(score * 2) / 2
      for (let i = 0; i < 5; i++) {
        if (score >= 1) {
          arr.push('on')
        } else if (score >= 0.5) {
          arr.push('half')
        } else {
          arr.push('off')
        }
        score--
      }
      this.starArr = arr
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
.stars
  display: inline-block
  font-size: 0
  .star
    display: inline-block
    background-repeat: no-repeat
    &.size_30
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-of-type
        margin-right: 0
      &.on
        bg-img('star36_on')
      &.half
        bg-img('star36_half')
      &.off
        bg-img('star36_off')
    &.size_40
      width: 20px
      height: 20px
      margin-right: 20px
      background-size: 20px 20px
      &:last-of-type
        margin-right: 0
      &.on
        bg-img('star48_on')
      &.half
        bg-img('star48_half')
      &.off
        bg-img('star48_off')
</style>
