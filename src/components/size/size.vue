<template>
    <div>
        <div class="sizecontroll">
            <div class="controll">
                <span class="text" @click="showsize()">选规格</span>
                <span class="dot">1</span>
            </div>
            <div class="sizedetail" v-show="showdetail"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showdetail: false
        }
    },
    methods: {
        showsize() {
            console.log(1)
        }
    }

}
</script>

<style lang="stylus">
.sizecontroll
    width 100%
    height 100%
    .controll
        width: 50px;
        height: 23px;
        border: 1px solid #c35f37;
        border-radius: 4px;
        position relative
        text-align center
        color #C35F37
        line-height 23px
        .text
            font-size 14px
        .dot
            position absolute 
            right -7px
            top -10px
            display inline-block
            width 15px
            height 15px
            text-align center
            line-height 16px
            border-radius 50%
            background #C35F37
            color #fff
    .sizedetail
        width 100%
        height 100%
        position fixed
        left 0
        top 0
        background red
</style>


