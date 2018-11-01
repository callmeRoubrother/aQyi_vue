<template>
  <div>
    <header class="header">
      <span class="back iconfont icon-fanhuidaohanglan" @click="back"></span>
      <p>输入短信验证码</p>
      <em></em>
    </header>
    <p class="codeTit">已发送短信验证码至+86 <span>{{ Num }}</span></p>
    <ul class="writeCode">
      <li>
        <input type="text" @input="checkCode()">
      </li>
      <li>
        <input type="text">
      </li>
      <li>
        <input type="text">
      </li>
      <li>
        <input type="text">
      </li>
      <li>
        <input type="text" @keyup="finallyCheck()">
      </li>
    </ul>
    <p class="afreshCode" @click="sendNewCode()">重新发送验证码</p>
    <p class="problem">遇到问题</p>
  </div>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import { MessageBox } from 'mint-ui'

Vue.use(MessageBox)
export default {
  data () {
    return {
      Num: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    checkCode () {
      let txts = $('.writeCode input')
      for (var i = 0; i < txts.length; i++) {
        var t = txts[i]
        t.index = i
        t.setAttribute('readonly', true)
        t.onkeyup = function () {
          this.value = this.value.replace(/^(.).*$/, '$1')
          var next = this.index + 1
          if (next > txts.length - 1) return
          txts[next].removeAttribute('readonly')
          txts[next].focus()
        }
      }
      txts[0].removeAttribute('readonly')
    },
    finallyCheck () {
      let txts = $('.writeCode input')
      let checkStr = ''
      for (var i = 0; i < txts.length; i++) {
        checkStr += txts[i].value
      }
      if (checkStr === localStorage.phoneCode) {
        localStorage.isLogin = 'ok'
        this.$router.push({ path: '/' })
      } else {
        MessageBox.alert('验证码输入错误').then(action => {
        })
      }
    },
    sendNewCode () {
    }
  },
  mounted () {
    let phoneNum = localStorage.phoneNum
    this.Num = phoneNum.slice(0, 3) + '****' + phoneNum.slice(7)
    console.log(this.Num)
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
  }
  .codeTit{
    @include rect(100%, .8rem);
    @include line-height(.8rem);
    padding-left: .3rem;
  }
  .writeCode{
    @include rect(100%, .5rem);
    @include padding(0 .15rem);
    @include flexbox();
    @include justify-content(space-between);
    li{
      @include flex();
      @include margin(0 .05rem);
      border-bottom: .03rem solid #e3e3e3;
      input{
        @include rect(100%, 100%);
        border: 0;
        @include text-align();
      }
    }
  }
  .afreshCode{
    @include rect(100%, .4rem);
    @include padding(0 .15rem);
    @include text-align(right);
    @include line-height(.4rem);
    @include text-color(#00ca00);
  }
  .problem{
    @include rect(100%, auto);
    @include text-align();
    position: fixed;
    bottom: .1rem;
  }
</style>
