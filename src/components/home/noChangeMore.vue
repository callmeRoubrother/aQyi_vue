<template>
  <div class="more">
    <div class="left">
      更多{{ message }}
      <span class="iconfont icon-rightarrow"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .more{
    @include flexbox();
    @include padding(.1rem 0);
    div{
      @include text-color(#0cd105);
      @include flex();
      @include text-align();
    }
  }
</style>
