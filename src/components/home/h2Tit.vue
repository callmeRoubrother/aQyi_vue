<template>
  <h2 id="teleTit">
    <span class="iconfont icon-dianshiju" :class="[classMessage]"></span>
    {{ message }}
  </h2>
</template>

<script>
export default {
  props: ['message', 'classMessage'],
  data () {
    return {
      className: '',
      isActive: true
    }
  },
  mounted () {
    this.className = this.$props.classMessage
    console.log(this.className)
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  h2{
    @include font-size(.16rem);
    @include padding(.1rem .08rem);
    span{
      @include font-size(.2rem);
    }
  }
</style>
