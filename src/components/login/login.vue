<template>
  <div class="login">
    <div class="logo">
      <img src="http://www.iqiyipic.com/common/fix/h5-aura/foot.png" alt="">
    </div>
    <form action="">
      <div class="phoneNum">
        <span @click="areaNum()">{{ city }}<i class="iconfont icon-icon32210"></i></span>
        <input type="text" class="phone_num" placeholder="请输入手机号码" name="username">
      </div>
      <div class="psw">
        <input id="showPwd" class="password_text" type="text" name="password" placeholder="请输入密码" style="display: none;"/>
        <input type="password" class="password" name="password" placeholder="请输入密码">
        <i class="iconfont icon-yanjing" id="showPassword" @click="showPassword()"></i>
      </div>
      <input type="submit" class="sub" value="登录" @click.prevent="login()">
    </form>
    <div class="forgetIt">
      <span>忘记密码</span>
      <em>|</em>
      <span>帮助</span>
    </div>
    <div class="otherLogin">
      <span></span>
      <p>其他方式登录</p>
      <span></span>
    </div>
    <mt-swipe :continuous="false" :auto="0">
      <mt-swipe-item>
        <ul>
          <li @click="otherMethods($event)">
            <span></span>
            <p>短信</p>
          </li>
          <li @click="otherMethods($event)">
            <span></span>
            <p>微信</p>
          </li>
          <li @click="otherMethods($event)">
            <span></span>
            <p>QQ</p>
          </li>
          <li @click="otherMethods($event)">
            <span></span>
            <p>百度</p>
          </li>
        </ul>
      </mt-swipe-item>
      <mt-swipe-item>
        <ul>
          <li @click="otherMethods($event)">
            <span></span>
            <p>FaceBook</p>
          </li>
          <li @click="otherMethods($event)">
            <span></span>
            <p>谷歌</p>
          </li>
          <li @click="otherMethods($event)">
            <span></span>
            <p>支付宝</p>
          </li>
          <li></li>
        </ul>
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
import 'jquery'
import axios from 'axios'
import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
import { mapState } from 'vuex'
import Vue from 'vue'
Vue.use(Swipe, SwipeItem, MessageBox)
export default {
  computed: {
    ...mapState({
      city: state => state.login.city
    })
  },
  methods: {
    otherMethods (event) {
      let mesg = event.currentTarget.getElementsByTagName('p')[0].textContent
      MessageBox.confirm('即将为你打开' + mesg).then(action => {
      }).catch(err => console.log(err))
    },
    areaNum () {
      this.$router.push({ path: '/areaNum' })
    },
    login () {
      const username = $('.phone_num').val()
      const password = $('.password').val()
      const reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (username === '') {
        MessageBox.alert('用户名不能为空').then(action => {
        })
      } else if (!reg.test(username)) {
        MessageBox.alert('用户名格式错误').then(action => {
        })
      } else {
        if (password === '') {
          MessageBox.alert('密码不能为空').then(action => {
          })
        } else {
          var params = new URLSearchParams()
          params.append('username', username)
          params.append('password', password)
          axios.post('/xunxun/users/login?', params).then(res => {
            if (res.data === 1) {
              localStorage.phoneNum = username
              localStorage.isLogin = 'ok'
              this.$router.push({ path: '/' })
            } else if (res.data === -1) {
              MessageBox.alert('密码错误').then(action => {
              })
            } else if (res.data === 2) {
              MessageBox.confirm('没有找到用户名，是否前往注册').then(action => {
                this.$router.push({ path: '/register' })
              }).catch(err => console.log(err))
            } else {
              MessageBox.alert('登录失败').then(action => {
              })
            }
          }).catch(err => console.log(err))
        }
      }
    },
    showPassword () {
      let val = $('.password').val()
      $('#showPwd').val(val)
      if ($('#showPassword').hasClass('icon-yanjing')) {
        $('.password').hide()
        $('#showPwd').show()
        $('#showPassword').removeClass('icon-yanjing').addClass('icon-biyan')
      } else {
        $('.password').show()
        $('#showPwd').hide()
        $('#showPassword').removeClass('icon-biyan').addClass('icon-yanjing')
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .login{
    text-align: center;
    .logo{
      @include rect(100%, .77rem);
      @include text-align();
      @include line-height(.77rem);
      @include margin(.2rem 0);
      img{
        @include rect(1rem, .47rem);
      }
    }
    .phoneNum, .psw{
      @include rect(auto, .5rem);
      @include margin(0 .3rem);
      @include flexbox();
      border-bottom: 1px solid #e8e8e8;
      span{
        @include font-size(.2rem);
        @include line-height(.5rem);
        i{
          @include padding(0 .1rem);
        }
      }
      input{
        border: 0;
        padding-left: .2rem;
        @include flex();
      }
    }
    .psw{
      position: relative;
      input{
        padding:0;
      }
      i{
        @include rect(.2rem, .15rem);
        @include text-color(#979797);
        @include font-size(.22rem);
        position: absolute;
        right: 0;
        top: .1rem;
      }
    }
    .sub{
      text-align: center;
      outline: none;
      border: 0;
      @include rect(80%, .5rem);
      @include background-color(#99eb97);
      @include border-radius(.5rem);
      @include margin(.3rem auto);
      @include text-color(white);
      @include font-size(.18rem);
    }
    .forgetIt{
      @include text-align();
      em{
        @include margin(0 .1rem);
        @include text-color(#ededed);
      }
    }
    .otherLogin{
      position: fixed;
      bottom: 1rem;
      @include rect(100%, auto);
      @include flexbox();
      @include margin(0 5%);
      span{
        @include rect(30%, auto);
        border-bottom: 1px solid #e7e7e7;
        transform: translateY(-50%);
      }
      p{
        @include rect(30%, auto);
      }
    }
    .mint-swipe{
      position: fixed;
      bottom: 0;
      @include rect(100%, .8rem);
      .mint-swipe-item{
        ul{
          @include rect(100%, 100%);
          @include flexbox();
          li{
            @include flex();
            @include text-align();
            &:nth-child(1){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -205px -86px;
              }
            }
            &:nth-child(2){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -205px 0;
              }
            }
            &:nth-child(3){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -102px 0;
              }
            }
            &:nth-child(4){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -306px 0;
              }
            }
            span{
              display: inline-block;
              @include rect(.5rem, .5rem);
              @include border-radius(50%);
            }
          }
        }
        &:nth-child(2){
          ul{
            li{
              &:nth-child(1){
                span{
                  background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -306px -86px;
                }
              }
              &:nth-child(2){
                span{
                  background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -205px -86px;
                }
              }
              &:nth-child(3){
                span{
                  background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat 0 -86px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
