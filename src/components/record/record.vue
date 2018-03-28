<template>
    <transition name="fade">
        <div v-show="showFlag" class="record-wrapper">
            <div class="header">
                <div class="content-wrapper">
                    <div class="content">
                        <div class="title">
                            <span class="brand">详情</span>
                            <span class="name">
                                <img src="../../assets/images/back.png" alt="后退" width="15" height="21" @click="goOrder">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="desk">
                    <h3 class="title">遇见厦门(中山路店) </h3>
                    <span class="date">2018-10-11 10:11:23</span>
                    <span>制作中</span>
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
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        orderList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            showFlag: false,
            selectFoods: []
        }
    },
    methods: {
        show() {
            this.showFlag = true
        },
        goOrder() {
            this.showFlag = false
        }
    }
}
</script>

<style lang="stylus">
@import "../../assets/css/mixin.styl"
.record-wrapper
    position fixed 
    left 0
    top 0
    z-index 120
    width 100vw
    height 100vh
    background #ffffff
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
            height 48px
            text-align center
            line-height 28px
            .title
                display inline-block
                font-family: PingFangSC-Medium;
                font-size: 16px;
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
</style>

