<template>
 <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥<span class="phigh">{{totalPrice}}</span>元</div>
          <div class="desc">共<span class="dhigh">{{totalCount}}</span>件</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <div>
                  <span class="name">{{food.name}}</span>
                  <span class="type">（{{food.format}}）</span>
                </div>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>

    <transition name="light">
      <div class="confirm" v-show="showconfirm">
        <div class="title">您的账号未绑定过手机号，请绑定</div>
        <div class="phone">
          <input placeholder="输入手机号" style="width: 280px;height: 36px;" class="username" ref="" />
        </div>
        <div class="code">
          <input ref="code" placeholder="验证码" style="width: 120px;height: 36px;position: absolute;left: 18px;" class="keycode" type="text" />
          <input style="width: 120px;height: 36px;position: absolute;right: 18px;background: #C35F37;text-indent: 0rem;color:#fff;" class="emit" type="button" value="发送验证码" @click="emitcode">
        </div>
        <div class="sure">
          <input type="button" class="loginon"  style="width: 280px;height:40px;background: #C35F37;" value="确定" @click="confirm" />
        </div>
      </div>
    </transition>
    <transition name="shake">
      <div class="mask" v-show="showconfirm" @click="hideconfirm"></div>
    </transition>


    <transition name="slide">
      <div class="place" v-show="showplace">
        <div class="header">
          <div class="content-wrapper">
            <div class="content">
              <div class="title">
                <span class="brand">下单</span>
                <span class="name">
                  <img src="../../assets/images/back.png" alt="后退" width="15" height="21">
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="desk">
            <h3 class="title">15号桌</h3>
            <span class="date">2018-10-11 10:11:23</span>
          </div>
          <div class="order" ref="order">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <div>
                  <span class="name">{{food.name}}</span>
                  <span class="type">（{{food.format}}）</span>
                </div>
                <div class="price">
                  <span>x5</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <span>￥{{food.price*food.count}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="total">
          <div class="food">
              <span class="name">总计:￥49.9</span>
              <span class="type">满减优惠-20</span>
          </div>
          <div class="cartcontrol-wrapper">
            <span>实付:<span style="font-size:18px;color:#C35F37;">29.9</span></span>
          </div>
        </div>
        <div class="mark">
          <h3 class="title">备注信息</h3>
          <span class="content">快点做</span>
        </div>
        <div class="paytype">
          <h4 class="title">选择支付方式</h4>
          <div class="balance">
            <div class="type">
              <img src="../../assets/images/pay.png" alt="" width="30px" height="30px">
            </div>
            <div class="text">余额支付</div>
            <div class="select">
              <img src="../../assets/images/selected.png" alt="" width="20px" height="20px">
            </div>
          </div>
          <div class="weixin">
            <div class="type">
              <img src="../../assets/images/wechat.png" alt="" width="30px" height="30px">
            </div>
            <div class="text">余额支付</div>
            <div class="select">
              <img src="../../assets/images/unselect.png" alt="" width="20px" height="20px">
            </div>
          </div>
        </div>
        <div class="sure">
          <input type="button" class="loginon"  style="width: 280px;height:40px;background: #C35F37;" value="确定" @click="confirm" />
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascripts-6">
import BScroll from 'better-scroll'; // 引入滚动样式
import cartcontrol from 'com/cartcontrol/cartcontrol' 
    export default {
      props: {
        selectFoods: {
          type: Array,
          default() {
            return [
              {
                price: 10,
                count: 2
              }
            ]
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBalls: [],
          fold: true,
          showconfirm: false,
          showplace: true
        };
      },
      computed: {
        totalPrice() {
          let total = 0
          this.selectFoods.forEach( (food) => {
            total += food.price * food.count
          })
          return total
        },
        totalCount() {
          let count = 0
          this.selectFoods.forEach( (food) => {
            count += food.count
          })
          return count
        },
        payDesc() {
          if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送 `
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            return `还差￥${diff}元起送`
          } else {
            return '去结算'
          }
        },
        payClass() { // 动态绑定class
          if (this.totalPrice < this.minPrice) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        },
        listShow() {
          if( !this.totalCount ){
            this.fold = true;
            return false;
          }
          let show = !this.fold;
          if(show) {
            this.$nextTick( () => {
              if( !this.scroll ) {
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.scroll.refresh()
              }
            })
          }
          return show;
        }
      },
      mounted() {
        this.initscroll()
      },
      components: {
        cartcontrol
      },
      methods: {
        initscroll() {
          this.menuScroll = new BScroll(this.$refs.order, {
              click: true // 默认派发点击事件 移动端点击只会出发一次，pc端点击的时候会触发两次
          }); 
        },
        toggleList() {
          if( !this.totalCount ){
            return;
          }
          this.fold = !this.fold;
        },
        empty() {
          this.selectFoods.forEach( (food) => {
            food.count = 0;
          })
          window.localStorage.removeItem("estore")
        },
        hideList() {
          this.fold = true;
        },
        pay() { // vue 中阻止点击事件的冒泡
          if(this.totalPrice < this.minPrice){
            return
          }
          this.showconfirm = !this.showconfirm
        },
        emitcode() {
        },
        confirm() {
          this.showconfirm = !this.showconfirm
        },
        hideconfirm() {
          if( !this.totalCount ){
            return;
          }
          this.showconfirm = !this.showconfirm
        }
      }
    }
</script>

<style lang="stylus">
@import "../../assets/css/mixin.styl";
  input 
    height 36px
    border-radius 5px
    border: 1px solid #D8D8D8;
    text-indent 1rem
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #C15735
      font-size: 0
      border-radius 10px
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #c15735
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #CE8841
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #fff
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 raba(0, 0, 0, 0.4)
        .price
            display: inline-block
            vertical-align: top 
            margin-top: 12px
            line-height: 24px
            padding-right: 12px
            box-sizing: border-box
            border-right: 1px solid rgba(255, 255, 255, 0.1)
            font-size: 12px
            font-weight: 700
            color: #fff
            &.highlight
                color: #fff
            .phigh
                font-size 16px
        .desc
            display: inline-block
            vertical-align: top 
            margin: 12px 0 0 12px
            line-height: 24px
            color: #fff
            font-size: 12px
            .dhigh
              font-size 16px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: #fff
          border-radius 0 10px 0 0 
          &.not-enough
            background: #CE8841
          &.enough
            background: #CE8841
            color: #fff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.move-enter-active
        transition: all 0.5s ease     
      &.move-enter, &.move-leave-active
        transition: all 0.5s ease     
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right 
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            display block 
            line-height: 24px
            font-size: 14px
            font-family: PingFangSC-Medium;
            color: #07111b
          .type
            display block 
            margin-left -8px
            font-size 10px
            color #999
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active
      transition: all 0.5s ease     
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0) 
      transition: all 0.5s ease 
  .confirm
    width 315px
    height 242px
    position fixed
    top calc(50vh - 121px)
    left calc(50vw - 157.5px)
    border-radius 5px
    background #fff
    z-index: 60
    &.light-enter-active, &.light-leave-active
        transition: all 0.5s ease     
    &.light-enter, &.light-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0) 
    .title
      height 20px
      margin-top 25px
      text-align center
      line-height 20px
      font-size: 14px;
      color: #555555
    .phone
      text-align center
      margin-top 20px
    .code
      position relative
      height 36px
      text-align center
      margin-top 20px
    .sure
      text-align center
      margin-top 20px
      color #ffffff
  .mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 50
    backdrop-filter: blur(10px)
    opacity 1
    background: rgba(7, 17, 27, 0.6)
    &.shake-enter-active
      transition: all 0.5s ease     
    &.shake-enter,&.shake-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
  .place
    position: fixed
    top: 0
    left: 0
    width 100vw
    height 100vh
    z-index 70
    background #fff
    &.slide-enter-active,&.slide-leave
      transition: all 0.5s
      transform: translate3d(0, 0, 0)
    &.slide-enter, &.slide-leave
      transform: translate3d(100%, 0, 0) 
    .header
      height 64px
      position relative
      color #fff
      background -webkit-linear-gradient(left,#C15735,#CE8841)
      background -moz-linear-gradient(left,#C15735,#CE8841)
      background linear-gradient(left,#C15735,#CE8841)
      filter progid:DXImageTransform.Microsoft.gradient(startColorstr='#C15735',endColorstr='#CE8841',GradientType='1')
      .content-wrapper
        font-size 13px
      .title
        margin 30px 0 10px 0
        text-align center
        .brand
          width 70px
          height 24px
          text-align center 
          line-height 24px
          font-size 17px
          display inline-block
        .name 
          width 15px
          height 21px
          text-align center
          line-height 30px
          font-size 21px
          display inline-block
          position absolute
          bottom 11px
          left 15px
    .body
      width 100%
      height 217px
      margin-top 5px
      overflow hidden
      .desk
        width 100%
        height 28px
        text-align center
        line-height 28px
        margin-top 15px
        .title
          display inline-block
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #555555;
          letter-spacing: -0.48px;
          float left
          padding-left 15px
        .date
          display inline-block
          float right
          padding-right 15px
      .order
        padding: 0 18px
        height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 25px 12px 15px
          box-sizing: border-box
          .name
            display block 
            line-height: 24px
            font-size: 14px
            font-family: PingFangSC-Medium;
            color: #07111b
          .type
            display block 
            margin-left -5px
            font-size 10px
            color #999
          .price
            font-family: PingFangSC-Medium;
            letter-spacing: -0.34px;
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: #999
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 20px
            color #C35F37
            font-size 12px
    .total
      width 100%
      height 60px
      margin-top 10px
      position relative
      .food
        position: relative
        padding: 12px 25px 12px 15px
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          display block 
          line-height: 24px
          font-size: 14px
          font-family: PingFangSC-Medium;
          color: #07111b
          padding-left 17px
        .type
          display block 
          margin-left 17px
          font-size 10px
          color #C35F37
      .cartcontrol-wrapper
        position: absolute
        right: 0
        bottom: 20px
        color #C35F37
        font-size 12px
        padding-right 20px
    .mark
      width 100%
      height 45px
      margin-top 10px
      .title
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0
        padding-left 15px
      .content
        display block
        margin 15px 0 0 30px
    .paytype
      width 100%
      height 125px
      margin-top 30px
      .title
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        padding-left 15px
      .balance
        display flex
        height 48px
        text-align center
        line-height 48px
        .type
          width 30px
          margin 20px 0 0 30px
        .text
          width 64px
          margin 12px 0 0 15px
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #555555;
          letter-spacing: 0;
        .select
          width 20px
          margin 17px 0 0 190px
      .weixin
        display flex
        height 48px
        text-align center
        line-height 48px
        .type
          width 30px
          margin 20px 0 0 30px
        .text
          width 64px
          margin 12px 0 0 15px
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #555555;
          letter-spacing: 0;
        .select
          width 20px
          margin 17px 0 0 190px
    .sure
      text-align center
      margin-top 30px
      color #ffffff
</style>