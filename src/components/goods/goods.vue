<template>
  <div class="goods">
    <div class="goods-left"
         ref="goodsLeft">
      <ul>
        <li class="goods-left-item hook-goods-left-item"
            v-for="(good,index) in goods"
            :key="index"
            :class="{active:currentSelIndex===index}"
            @click="toThisGoodList(index)">
          <div class="inner">
            <i v-if="good.type !==-1"
               class="icon"
               :class="mapSupportType[good.type]"></i>
            <span class="name">{{good.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-right"
         ref="goodsRight">
      <ul>
        <li v-for="(good,index) in goods"
            :key="index"
            class="good hook-good">
          <h2 class="good-title">{{good.name}}</h2>
          <ul>
            <li class="food"
                v-for="(food,index) in good.foods"
                :key="index">
              <img class="icon"
                   :src="food.icon"
                   alt="">
              <div class="content">
                <h3 class="food-name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extr">
                  <span class="sell">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price-wrap">
                  <span class="price">
                    <span class="price-yuan">￥</span>
                    <span class="price-num">{{food.price}}</span>
                  </span>
                  <span v-if="food.oldPrice"
                        class="old-price">
                    <span class="old-price-yuan">￥</span>
                    <span class="old-price-num">{{food.oldPrice}}</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
const NoError = 0
export default {
  data () {
    return {
      goods: [],
      mapSupportType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      currentSelIndex: 0,
      goodsRightListHeightArr: []
    }
  },

  mounted () {
    this.$http.get('/apis/goods')
      .then(res => {
        let data = res.data
        if (data.errorno === NoError) {
          this.goods = data.data
          this.initScroll()
          this.calcGoodsRightHeight()
        }
      })
  },
  methods: {
    initScroll () {
      this.goodsLeftScroll = new BScroll(this.$refs.goodsLeft, {
        click: true
      })
      this.goodsRightScroll = new BScroll(this.$refs.goodsRight, {
        click: true,
        probeType: 2
      })
      this.goodsRightScroll.on('scroll', (pos) => {
        let posY = -pos.y
        let heightArr = this.goodsRightListHeightArr
        if (posY < heightArr[0]) {
          this.currentSelIndex = 0
        } else if (posY >= heightArr[heightArr.length - 1]) {
          this.currentSelIndex = heightArr.length - 1
        } else {
          for (let i = 0; i < heightArr.length - 1; i++) {
            if (posY >= heightArr[i] && posY < heightArr[i + 1]) {
              this.currentSelIndex = i
              break
            }
          }
        }
        this.goodsLeftScroll.scrollToElement(this.$refs.goodsLeft.getElementsByClassName('hook-goods-left-item')[this.currentSelIndex], 200)
        // this.currentSelIndex = this.goodsRightListHeightArr.findIndex((height,index,arr)=>{
        //   if(){}
        // })
      })
    },
    calcGoodsRightHeight () {
      // 确保dom已经加载
      this.$nextTick(() => {
        let height = 0
        let goodsRightListHeightArr = [height]
        let goodsRight = this.$refs.goodsRight
        let listEl = goodsRight.getElementsByClassName('hook-good')
        for (let i = 0; i < listEl.length; i++) {
          let rect = listEl[i].getBoundingClientRect()
          height += rect.height
          goodsRightListHeightArr.push(height)
        }
        this.goodsRightListHeightArr = goodsRightListHeightArr
      })
    },
    toThisGoodList (index) {
      this.currentSelIndex = index
      this.goodsRightScroll.scrollToElement(this.$refs.goodsRight.getElementsByClassName('hook-good')[index], 200)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.goods
  position: absolute
  left: 0
  top: 174px
  display: flex
  bottom: 48px
  width: 100%
  overflow: hidden
  .goods-left
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .goods-left-item
      display: table
      width: 100%
      height: 54px
      padding: 0 12px
      box-sizing: border-box
      &.active
        position: relative
        margin-top: -1px
        z-index: 1
        background-color: pink
        .inner
          border-1px-none()
      .inner
        display: table-cell
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display: inline-block
          background-repeat: no-repeat
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .name
          vertical-align: top
          line-height: 14px
          font-size: 12px
          color: rgb(7, 17, 27)
  .goods-right
    flex: 1
    .good
      .good-title
        height: 26px
        padding-left: 14px
        line-height: 26px
        font-size: 12px
        background-color: #f3f5f7
        color: rgb(147, 153, 159)
        border-left: 2px solid #d9dde1
      .food
        display: flex
        padding: 18px
        .icon
          flex: 0 0 57px
          width: 57px
          height: 57px
          margin-right: 10px
        .content
          flex: 1
          padding-top: 2px
          .food-name
            margin-bottom: 8px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc
            height: 10px
            margin-bottom: 8px
            line-height: 10px
            font-size: 10px
            color: #93999f
          .extr
            color: rgb(147, 153, 159)
            margin-bottom: 8px
            .sell, .rating
              line-height: 10px
              font-size: 10px
            .sell
              margin-right: 12px
          .price-wrap
            .price
              margin-right: 8px
              font-size: 0
              color: rgb(240, 20, 20)
              .price-yuan
                font-size: 10px
              .price-num
                font-weight: 700
                font-size: 14px
            .old-price
              font-size: 0
              color: rgb(147, 153, 159)
              text-decoration: line-through
              .old-price-yuan, .old-price-num
                font-size: 10px
              .old-price-num
                font-weight: 700
</style>
