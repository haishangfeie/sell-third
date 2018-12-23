<template>
  <div class="title-line">
    <div class="line"></div>
    <span class="title">{{title}}</span>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-line
  display: flex
  margin: 28px auto 24px
  align-items: center
  .line
    flex: 1
    height: 1px
    background-color: rgba(255, 255, 255, 0.2)
  .title
    height: 14px
    padding: 0 12px
    line-height: 14px
    font-size: 14px
</style>
