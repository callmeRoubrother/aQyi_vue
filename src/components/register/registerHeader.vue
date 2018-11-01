<template>
  <header class="header">
    <span class="back iconfont icon-fanhuidaohanglan" @click="back"></span>
    <p>注册</p>
    <em @click="gotoLogin">登录</em>
  </header>
</template>

<script>
export default {
  methods: {
    gotoLogin () {
      this.$router.push({ path: `/login` })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .header{
    @include padding(0 .1rem);
    @include justify-content(space-between);
    @include line-height(.44rem);
    span{
      @include text-color(#9f9f9f);
    }
    p{
      @include text-color(white);
    }
    em{
      @include text-color(#b7b7b7);
    }
  }
</style>
