<template>
    <div>
    <div class="header">
      <div class="content-wrapper">
        <div class="content">
          <div class="title">
            <span class="brand">遇见厦门</span>
            <span class="name" @click="record">购买记录</span>
          </div>
        </div>
      </div>
    </div>
    
    <transition name="move">
      <div class="recording" v-show="recordshow">
        <div class="header">
          <div class="content-wrapper">
            <div class="content">
              <div class="title">
                <span class="brand">购买记录</span>
                <span class="name" @click="change">
                    <img src="../../assets/images/back.png" alt="后退" width="15" height="21">
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(item, index) in orderList" :key="index" @click="selectRecord">
              <div class="store">
                <span class="name">遇见厦门(中山路店)</span>
                <span class="time">2018-10-11 10:11:23</span>
              </div>
              <div class="operation">
                <span>制作中</span>
              </div>
              <div class="food-temp">
                <span class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;等{{item.count}}件商品</span>
                <span class="total"><span style="font-size:12px;">￥</span>{{item.price}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <record ref="record" :orderList="orderList"></record>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import record from 'com/record/record'
import {sessionOperation} from '../../assets/js/util'

  export default {
    data() {
      return {
        fold: true,
        orderList: []
      };
    },
    methods: {
     change() {
      this.fold = !this.fold
     },
     record() {
      this.fold = !this.fold
     },
     selectRecord() {
       this.$refs.record.show()
     }
    },
    created() {
    },
    computed: {
      recordshow() {
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
        },
    },
    components: {
      record
    },
    mounted: function() {
      let sessionData = sessionOperation()
      this.orderList = sessionData
      console.log(this.orderList)
    }
  };
</script>

<style lang="stylus">
@import '../../assets/css/mixin'
.header
  height 64px
  position relative
  overflow hidden
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
      font-size 13px
      display inline-block
      position absolute
      bottom 13px
      right 15px
.recording
  position fixed
  top 0
  left 0
  z-index 100
  width 100vw
  height 100vh
  background #fff
  transition: all 0.5s
  &.move-enter-active,&.move-leave
    transform: translate3d(0, 0, 0)
  &.move-enter, &.move-leave-active
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
.list-content
  padding: 0 18px
  max-height: calc(100vh - 100px)
  overflow: hidden
  background: #fff
  .food
    position: relative
    padding: 12px 0
    box-sizing: border-box
    border-1px(rgba(7, 17, 27, 0.1))
    .store
      font-size 12px
      .name
        display block 
        line-height: 24px
        font-size: 16px
        font-family: PingFangSC-Medium;
        color: #07111b
      .time
        display block 
        margin-left -8px
        font-size 12px
        color #999
        padding-left 8px
    .operation
      position: absolute
      right: 1px
      top: 10px
      line-height: 24px
      font-size: 14px
      font-weight: 700
      color: rgb(240, 20, 20)
    .food-temp
      margin-top 10px
      .name
        line-height: 24px
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #999999;
      .total 
        position absolute 
        bottom 15px
        right 5px
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000000;
        letter-spacing: -0.29px;
        line-height: 17px;  
</style>