<template>
  <div class="rigister">
    <div class="logo">
      <img src="http://www.iqiyipic.com/common/fix/h5-aura/foot.png" alt="">
    </div>
    <div class="phoneNum">
      <span @click="areaNum()">{{ city }} <i class="iconfont icon-icon32210"></i></span>
      <input type="text" class="phone_num" placeholder="请输入手机号码" name="username">
    </div>
    <input type="submit" class="sub" value="获取短信验证码" @click="gotoVerify">
    <div class="agree">
      <input type="radio" class="confirm">
      <span>同意</span>
      <em>《用户协议》、 《隐私政策》</em>
    </div>
    <p class="help">帮助</p>
    <div class="otherLogin">
      <span></span>
      <p>其他方式登录</p>
      <span></span>
    </div>
    <mt-swipe :continuous="false" :auto="0">
      <mt-swipe-item>
        <ul id="others">
          <li @click.stop="otherMethods($event)">
            <span></span>
            <p>微信</p>
          </li>
          <li @click.stop="otherMethods($event)">
            <span></span>
            <p>QQ</p>
          </li>
          <li @click.stop="otherMethods($event)">
            <span></span>
            <p>微博</p>
          </li>
          <li @click.stop="otherMethods($event)">
            <span></span>
            <p>百度</p>
          </li>
        </ul>
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import axios from 'axios'
import { mapState } from 'vuex'
import { Swipe, SwipeItem, MessageBox } from 'mint-ui'

Vue.use(Swipe, SwipeItem, MessageBox)
export default {
  computed: {
    ...mapState({
      city: state => state.login.city
    })
  },
  methods: {
    gotoVerify () {
      const reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if ($('.phone_num').val() === '') {
        MessageBox.alert('手机号码不能为空').then(action => {
        })
      } else {
        if (reg.test($('.phone_num').val())) {
          if ($('.confirm').prop('checked')) {
            axios.get('/xunxun/users/sendCode?tel=' + $('.phone_num').val()).then(res => {
              console.log(res)
              if (res.data === 0) {
                MessageBox.alert('手机号验证码获取失败').then(action => {
                })
              } else if (res.data === 1) {
                MessageBox.alert('该手机号已注册').then(action => {
                })
              } else {
                localStorage.phoneNum = $('.phone_num').val()
                localStorage.phoneCode = res.data.code
                this.$router.push({ path: '/verify' })
              }
            })
          } else {
            MessageBox.alert('是否同意协议').then(action => {
            })
          }
        } else {
          MessageBox.alert('手机号码格式错误').then(action => {
          })
        }
      }
    },
    otherMethods (event) {
      let mesg = event.currentTarget.getElementsByTagName('p')[0].textContent
      MessageBox.confirm('即将为你打开' + mesg).then(action => {
      }).catch(err => console.log(err))
    },
    areaNum () {
      this.$router.push({ path: '/areaNum' })
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .rigister{
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
    .agree{
      @include text-align();
      em{
        @include margin(0 .1rem);
        @include text-color(#99eb97);
      }
    }
    .help{
      @include rect(100%, .5rem);
      @include line-height(.5rem);
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
            &:nth-child(3){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat 0 0;
              }
            }
            &:nth-child(1){
              span{
                background: url("http://www.iqiyipic.com/common/fix/v3-login/login-other.png") no-repeat -205px 0;
              }
            }
            &:nth-child(2){
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
      }
    }
  }
</style>
