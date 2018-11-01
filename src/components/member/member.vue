<template>
  <div>^_^ ^_^请先充值成为VIP会员，可查看内容^_^ ^_^</div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.isLogin === 'ok') {
      next()
    } else {
      next('/user')
    }
  }
}
</script>

<style lang="scss">

</style>
