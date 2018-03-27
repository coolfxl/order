<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascripts-6">
import Vue from 'vue'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        created() {
        },
        methods: {
            addCart(event) {
                // if(!event._constructed){
                //     return
                // }
                if (!this.food.count) { // better-scroll中添加点击事件，要传入一个参数
                    Vue.set(this.food, 'count', 1) // 给某个对象设置某个属性，和属性值
                }else{
                    this.food.count++
                    let resultJSON = JSON.parse(window.localStorage.getItem("estore"))
                    if( resultJSON ) {
                        if(resultJSON[this.food.id]) {
                            resultJSON[this.food.id].count = this.food.count
                            window.localStorage.setItem("estore", JSON.stringify(resultJSON))
                        }
                    }
                }
                // this.$root.eventHub.$emit('cart-add', event)
            },
            decreaseCart(event) {
                // if(!event._constructed){
                //     return
                // }
                if(this.food.count){
                    this.food.count--
                    let resultJSON = JSON.parse(window.localStorage.getItem("estore"))
                    if( resultJSON ) {
                        if(resultJSON[this.food.id]) {
                            resultJSON[this.food.id].count = this.food.count
                            window.localStorage.setItem("estore", JSON.stringify(resultJSON))
                        }
                    }
                }
            },
            statistic() {
                return this.food.count
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            opacity:1
            transform translate3d(0,0,0)
            transition all 0.4s linear
            &.move-enter,&.move-leave-active
                transition all 0.4s linear
                transform translate3d(24px,0,0)
                opacity 0
                .inner
                    transform:rotate(180deg)
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: #989A9C
                transition all 0.4s linear
                transform rotate(0deg)
        .cart-add
            display: inline-block
            padding: 6px
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: #989A9C
        .cart-count
            display: inline-block
            vertical-align: top 
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            colof: rgb(147, 153, 159)
        .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: #C35F37
</style>