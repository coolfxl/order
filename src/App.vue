<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import header from 'com/vHeader/vHeader';
export default {
  data() {
    return {
      
    }
  },
  methods: {

  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus">
</style>
