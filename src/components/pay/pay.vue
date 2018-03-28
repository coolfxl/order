<template>
    <div>
        <div class="success" v-show="paysuccess">
            <div class="result">
                <div class="title">
                    <span>付款结果</span>
                </div>
                <div class="flag">
                    <img src="../../assets/images/success.png" width="60" height="60" alt="付款成功">
                </div>
                <div class="text">
                    <span>付款成功</span>
                </div>
            </div>
            <div class="bounce">
                <span @click="home(1)">回首页</span>
            </div>
        </div>
        <div class="fail" v-show="payfail">
            <div class="result">
                <div class="title">
                    <span>付款结果</span>
                </div>
                <div class="flag">
                    <img src="../../assets/images/fail.png" width="60" height="60" alt="付款失败">
                </div>
                <div class="text">
                    <span>付款失败</span>
                </div>
            </div>
            <div class="bounce">
                <div class="home" @click="home(2)">回首页</div>
                <div class="repay" @click="repay">重新支付</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paysuccess: false,
            payfail: false
        }
    },
    methods: {
        show(status) {
            if(status == 1) {
                this.paysuccess = !this.paysuccess
            } else {
                this.payfail = !this.payfail
            }
        },
        home(status) {
            if(status == 1) {
                this.$root.Bus.$emit('close-order')
                this.paysuccess = !this.paysuccess
            } else {
                this.$root.Bus.$emit('close-order')
                this.payfail = !this.payfail
            }
        },
        repay() {
            this.payfail = !this.payfail
        }
    }
}
</script>

<style lang="stylus">
.success
    position fixed
    left 0
    top 0
    width 100vw
    height 100vh
    z-index 100
    background #fff
    .result
        position relative
        width 100vw
        height 50vh
        text-align center
        color #ffffff
        background -webkit-linear-gradient(left,#C15735,#CE8841)
        background -moz-linear-gradient(left,#C15735,#CE8841)
        background linear-gradient(left,#C15735,#CE8841)
        .title
            position absolute 
            width 68px
            height 25px
            line-height 25px
            text-align center
            left calc(50vw - 34px)
            top 30px
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #FFFFFF;
            letter-spacing: -0.41px;
        .flag
            position absolute 
            width 60px
            height 60px
            bottom 105px
            left calc(50vw - 30px)
        .text
            position absolute 
            width 72px
            height 25px
            bottom 71px
            left calc(50vw - 36px)
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #FFFFFF;
            letter-spacing: -0.43px;
    .bounce
        position absolute
        left calc(50vw - 160px)
        top calc(50vh + 45px)
        width 320px
        height 45px
        text-align center
        line-height 45px
        border-radius: 5px;
        background #C35F37
        ont-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: -0.34px;
.fail  
    position fixed
    left 0
    top 0
    width 100vw
    height 100vh
    z-index 100
    background #fff
    .result
        position relative
        width 100vw
        height 50vh
        text-align center
        color #ffffff
        background -webkit-linear-gradient(left,#C15735,#CE8841)
        background -moz-linear-gradient(left,#C15735,#CE8841)
        background linear-gradient(left,#C15735,#CE8841)
        .title
            position absolute 
            width 68px
            height 25px
            line-height 25px
            text-align center
            left calc(50vw - 34px)
            top 30px
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #FFFFFF;
            letter-spacing: -0.41px;
        .flag
            position absolute 
            width 60px
            height 60px
            bottom 105px
            left calc(50vw - 30px)
        .text
            position absolute 
            width 72px
            height 25px
            bottom 71px
            left calc(50vw - 36px)
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #FFFFFF;
            letter-spacing: -0.43px;
    .bounce
        position absolute
        left calc(50vw - 160px)
        top calc(50vh + 45px)
        width 320px
        height 45px
        text-align center
        line-height 45px
        border-radius: 5px;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: -0.34px;
        display: flex;
        justify-content: space-between;
        .home
            width 140px
            background #ffffff
            border: 1px solid #C35F37;
            border-radius: 5px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #C35F37;
            letter-spacing: -0.34px
        .repay
            width 140px
            background: #C35F37;
            border-radius: 5px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: -0.34px;
</style>

