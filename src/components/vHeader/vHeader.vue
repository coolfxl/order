<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="content">
        <div class="title">
          <span class="brand">遇见厦门</span>
          <span class="name">购买记录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
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
</style>