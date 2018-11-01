<template>
  <header class="header">
    <div @click="backTop">
      <img src="//www.iqiyipic.com/common/fix/h5-aura/iqiyi-logo.png" class="logo" />
    </div>
    <ul>
      <li>推荐</li>
      <li>橙红时代</li>
      <li>凉生</li>
      <li>热点</li>
      <li>电视剧</li>
    </ul>
    <div>
      <span class="iconfont icon-caidan"></span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    backTop () {
      document.getElementById('content').scrollTop = 0
    }
  }
}
</script>

<style lang="scss">

</style>
