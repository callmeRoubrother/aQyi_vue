<template>
  <footer class="footer">
    <ul>
      <router-link to="/home" tag="li">
        <span class="iconfont icon-shoucang"></span>
        <p>首页</p>
      </router-link>
      <router-link to="/hot" tag="li">
        <span class="iconfont icon-redianshijian"></span>
        <p>热点</p>
      </router-link>
      <router-link to="/member" tag="li">
        <span class="iconfont icon-huangguan"></span>
        <p>会员</p>
      </router-link>
      <router-link to="/user" tag="li">
        <span class="iconfont icon-dingwei"></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .footer{
    ul{
      @include flexbox();
      li{
        @include flex();
        @include text-align();
        span{
          @include font-size(.22rem);
        }
        &.router-link-active{
          @include text-color(#0cd105);
        }
      }
    }
  }
</style>
