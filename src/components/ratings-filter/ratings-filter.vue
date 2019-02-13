<template>
  <div class="ratings-filter">
    <div class="top">
      <div class="btn all"
           :class="{highlight:rateType===2}"
           @click="tapBtn(2)">
        <span class="main">{{all}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="btn positive"
           :class="{highlight:rateType===0}"
           @click="tapBtn(0)">
        <span class="main">{{positive}}
          <span class="count">{{positiveLen}}</span>
        </span>
      </div>
      <div class="btn negative"
           :class="{highlight:rateType===1}"
           @click="tapBtn(1)">
        <span class="main">{{negative}}</span>
        <span class="count">{{ratings.length-positiveLen}}</span>
      </div>
    </div>
    <div class="bottom"
         @click="toggleOnlyContent">
      <i class="icon-check_circle"
         :class="{highlight:onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const ALL = 2
export default {
  props: {
    rateType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    all: {
      type: String,
      default: '全部'
    },
    positive: {
      type: String,
      default: '满意'
    },
    negative: {
      type: String,
      default: '吐槽'
    }
  },
  computed: {
    positiveLen () {
      let count = 0
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].rateType === POSITIVE) {
          count++
        }
      }
      return count
    }
  },
  methods: {
    tapBtn (rateType) {
      this.$emit('update-rateType', rateType)
    },
    toggleOnlyContent () {
      this.$emit('update-only-content', !this.onlyContent)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.ratings-filter
  padding: 0 18px
  .top
    padding-bottom: 18px
    margin-bottom: 12px
    font-size: 0
    border-1px(rgba(7, 17, 27, 0.1))
    .btn
      display: inline-block
      padding: 10px 12px
      margin-right: 8px
      border-radius: 2px
      &:last-of-type
        margin-right: 0
      .main
        font-size: 12px
        line-height: 12px
      .count
        font-size: 8px
        line-height: 12px
      &.all, &.positive
        background-color: rgba(0, 160, 220, 0.2)
        color: #4d555d
        &.highlight
          background-color: rgb(0, 160, 220)
          color: #fff
      &.negative
        background-color: rgba(77, 85, 93, 0.2)
        color: #4d555d
        &.highlight
          background-color: rgb(77, 85, 93)
          color: #fff
  .bottom
    padding: 12px 0
    .icon-check_circle
      margin-right: 4px
      vertical-align: top
      color: #b7bbbf
      line-height: 20px
      font-size: 20px
      &.highlight
        color: #00b43c
    .text
      vertical-align: top
      font-size: 12px
      line-height: 20px
      color: #93999f
</style>
