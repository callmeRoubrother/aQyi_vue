<template>
  <header class="header">
    <p> </p>
    <span>我的</span>
    <i class="iconfont icon-sousuo"></i>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .header{
    @include flexbox();
    @include justify-content(space-between);
    @include line-height(.44rem);
    span{
      @include font-size(.16rem);
    }
    i{
      @include font-size(.24rem);
    }
  }
</style>
