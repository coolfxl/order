<template>
    <div>
        <transition name="slide">
            <div class="place" v-show="showplace">
                <div class="header">
                    <div class="content-wrapper">
                        <div class="content">
                            <div class="title">
                                <span class="brand">下单</span>
                                <span class="name" @click="change">
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
                    <div class="balance" @click="payselect(1)" :class="[selectIndex == 1 ? 'active' : 'unactive']">
                        <div class="type">
                            <img src="../../assets/images/pay.png" alt="" width="30px" height="30px">
                        </div>
                        <div class="text">余额支付</div>
                        <div class="select">
                            <img :src="selectIndex == 1 ? selected : unselect" alt="" width="20px" height="20px">
                        </div>
                    </div>
                    <div class="weixin" @click="payselect(2)" :class="[selectIndex == 2 ? 'active' : 'unactive']">
                        <div class="type">
                            <img src="../../assets/images/wechat.png" alt="" width="30px" height="30px">
                        </div>
                        <div class="text">余额支付</div>
                        <div class="select">
                            <img :src="selectIndex == 2 ? selected : unselect" alt="" width="20px" height="20px">
                        </div>
                    </div>
                </div>
                <div class="sure">
                    <input type="button" class="loginon"  style="width: 280px;height:40px;background: #C35F37;" value="确定" @click="sure" />
                </div>
            </div>
        </transition>

        <pay ref="pay"></pay>
    </div>
</template>


<script>
import BScroll from 'better-scroll'
import pay from 'com/pay/pay'
import selected from 'imgs/selected.png'
import unselect from 'imgs/unselect.png'
export default {
    props: {
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            showplace: false,
            selectIndex: -1,
            selected,
            unselect
        }
    },
    methods: {
        change() {
          this.showplace = !this.showplace
          this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.order, {
                click: true
                });
            } else {
                this.scroll.refresh();
            }
            });
        },
        sure() {
            this.$refs.pay.show(2)
        },
        payselect(index) {
            this.selectIndex =  index
        }
    },
    components: {
        BScroll,
        pay,
    },
    computed: {
       
    },
    mounted: function() {
        var THIS = this
        this.$root.Bus.$on("close-order" , function() {
            THIS.showplace = false
        })
    }
}
</script>

<style lang="stylus">
@import "../../assets/css/mixin.styl"
.place
    position: fixed
    top: 0
    left: 0
    width 100vw
    height 100vh
    z-index 70
    background #fff
    transition: all 0.5s
    &.slide-enter-active,&.slide-leave
      transform: translate3d(0, 0, 0)
    &.slide-enter, &.slide-leave-active
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
        max-height 140px
        margin-top 5px
        overflow hidden
        .desk
            width 100%
            height 28px
            text-align center
            line-height 28px
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
            max-height: 120px
            overflow: hidden
            background: #fff
            .food
                position: relative
                padding: 7px 25px 10px 15px
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
        height 48px
        position relative
        .food
            position: relative
            padding: 2px 25px 10px 15px
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
            margin: 6px 0 0 30px;
            line-height: 17px;
    .paytype
        width 100%
        height 96px
        margin-top 18px
        .title
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            padding-left 15px
        .balance
            position relative
            width 100%
            height 30px
        .type
            position absolute
            top 10px
            left 30px
        .text
            position absolute
            top 15px
            left 75px
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #555555;
            letter-spacing: 0;
        .select
            position absolute 
            top 12px
            right 30px
            width 20px
            height 20px
            border-radius 50%
    .weixin
        position relative
        width 100%
        height 30px
        margin-top 10px
        .type
            position absolute
            top 10px
            left 30px
        .text
            position absolute
            top 15px
            left 75px
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #555555;
            letter-spacing: 0;
        .select
            position absolute 
            top 12px
            right 30px
    .sure
        text-align: center;
        color: #fff;
        position: fixed;
        left: calc(50vw - 140px);
        top: calc(100vh - 50px)
</style>
