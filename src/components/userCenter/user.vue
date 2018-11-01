<template>
  <div>
    <userHeader></userHeader>
    <div class="userLogo">
      <div class="left">
        <img src="//www.iqiyipic.com/common/fix/h5-aura2.0/userCard-nologin.png" alt="">
        <div class="loginButton">
          <span @click="goLogin()">登陆</span>
          <em> | </em>
          <span @click="goRegister()">注册</span>
        </div>
        <div class="loginName" style="display: none;">
          <span class="userName">{{ username }}</span>
          <em> | </em>
          <span @click="loginOut()">退出登录</span>
        </div>
      </div>
      <p>签到领积分</p>
    </div>
    <ul class="func">
      <li>
        <span class="iconfont icon-xingxing1"></span>
        <p>我的收藏</p>
      </li>
      <li>
        <span class="iconfont icon-shizhongclock74"></span>
        <p>观看历史</p>
      </li>
      <li>
        <span class="iconfont icon-xiazai"></span>
        <p>离线中心</p>
      </li>
      <li>
        <span class="iconfont icon-wodeqianbao"></span>
        <p>我的钱包</p>
      </li>
      <li>
        <span class="iconfont icon-wodedingdan"></span>
        <p>我的订单</p>
      </li>
      <li>
        <span class="iconfont icon-youxi"></span>
        <p>我的游戏</p>
      </li>
      <li>
        <span class="iconfont icon-wodejifen"></span>
        <p>我的积分</p>
      </li>
      <li>
        <span class="iconfont icon-shezhi"></span>
        <p>设置</p>
      </li>
      <li>
        <span class="iconfont icon-iconfonticon4"></span>
        <p>帮助反馈</p>
      </li>
      <li>
        <span class="iconfont icon-shangchuan"></span>
        <p>我的上传</p>
      </li>
      <li>
        <span class="iconfont icon-wenjian"></span>
        <p>我的片段</p>
      </li>
      <li>
        <span class="iconfont icon-pifu"></span>
        <p>主题皮肤</p>
      </li>
      <li>
        <span class="iconfont icon-huiyuanlibao"></span>
        <p>福利礼包</p>
      </li>
      <li>
        <span class="iconfont icon-qicheqianlian-1-copy"></span>
        <p>流量超市</p>
      </li>
      <li>
        <span class="iconfont icon-qianbao"></span>
        <p>借钱</p>
      </li>
    </ul>
  </div>
</template>

<script>
import 'jquery'
import userHeader from '@/components/userCenter/userHeader'
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    goRegister () {
      this.$router.push({ path: `register` })
    },
    goLogin () {
      this.$router.push({ path: `login` })
    },
    loginOut () {
      localStorage.removeItem('phoneNum')
      localStorage.removeItem('isLogin')
      this.checkLogin()
    },
    checkLogin () {
      this.username = localStorage.getItem('phoneNum')
      console.log(this.username)
      if (this.username) {
        $('.loginButton').hide()
        $('.loginName').show()
      } else {
        $('.loginButton').show()
        $('.loginName').hide()
      }
    }
  },
  components: {
    userHeader
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .userLogo{
    @include rect(100%, 1rem);
    @include flexbox();
    @include justify-content(space-between);
    @include background-color(#2e2e30);
    @include padding(.22rem .15rem);
    .left{
      @include flexbox();
      img{
        @include rect(.66rem, .66rem);
        @include border-radius(50%);
        @include margin(0 .1rem 0 0);
      }
      em{
        @include text-color(white);
        @include margin(0 .1rem);
        @include line-height(.66rem);
      }
      span{
        @include text-color(white);
        @include line-height(.66rem);
      }
    }
    p{
      @include rect(auto, .26rem);
      @include background-color(#666);
      @include margin(.2rem 0 0 0);
      @include padding(.05rem .1rem);
      @include border-radius(.26rem);
      @include text-color(white);
    }
  }
  .func{
    @include flexbox();
    @include flex-flow(wrap);
    li{
      @include rect(33.2%, .8rem);
      @include text-align();
      @include border(1px, #666, solid);
      &:nth-child(10){
        span{
          @include text-color(#1289e7);
        }
      }
      &:nth-child(11){
        span{
          @include text-color(#1289e7);
        }
      }
      &:nth-child(12){
        span{
          @include text-color(#1289e7);
        }
      }
      &:nth-child(13){
        span{
          @include text-color(#1289e7);
        }
      }
      &:nth-child(14){
        span{
          @include text-color(#1289e7);
        }
      }
      &:nth-child(15){
        span{
          @include text-color(#1289e7);
        }
      }
      span{
        @include font-size(.26rem);
        @include text-color(#01d200);
      }
    }
  }
</style>
