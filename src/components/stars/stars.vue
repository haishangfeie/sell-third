<template>
  <div class="stars">
    <span class="star size_40 on"></span>
    <span class="star size_40 on"></span>
    <span class="star size_40 on"></span>
    <span class="star size_40 on"></span>
    <span class="star size_40 on"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
.stars
  display: inline-block
  font-size: 0
  .star
    display: inline-block
    background-repeat no-repeat
    &.size_30
      width: 15px
      height: 15px
      margin-right 6px
      background-size: 15px 15px
      &:last-of-type
        margin-right 0
      &.on
        bg-img('star36_on')
      &.half
        bg-img('star36_half')
      &.off
        bg-img('star36_off')
    &.size_40
      width: 20px
      height: 20px
      margin-right 20px
      background-size: 20px 20px
      &:last-of-type
        margin-right 0
      &.on
        bg-img('star48_on')
      &.half
        bg-img('star48_half')
      &.off
        bg-img('star48_off')
</style>
