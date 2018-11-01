<template>
  <header class="header">
    <div @click="backHome()">
      <img src="//www.iqiyipic.com/common/fix/h5-aura/iqiyi-logo.png" class="logo" />
    </div>
    <div class="sec">
      <mt-search v-model="val" id="sec" cancel-text="" :placeholder="hotQuery"></mt-search>
    </div>
    <p class="cancel" @click="cancelBack()">取消</p>
  </header>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import axios from 'axios'
import { Search } from 'mint-ui'
Vue.component(Search.name, Search)
export default {
  data () {
    return {
      oldArr: [],
      secHistory: [],
      hotQuery: '',
      val: '',
      secArr: []
    }
  },
  created () {
    axios.get('/search/m?if=hotQuery&p=0').then(res => {
      let leng = res.data.data.length
      const randomNum = Math.round(Math.random() * (leng - 1))
      this.hotQuery = res.data.data[randomNum].query
    })
  },
  methods: {
    backHome () {
      this.$router.push({ path: `/home` })
    },
    cancelBack () {
      this.$router.go(-1)
    },
    searchQuery () {
      $('#beforeSec').hide()
      $('#afterSec').show()
      this.oldArr.push($('#sec').val())
      this.secHistory = new Set(this.oldArr)
      console.log(this.secHistory)
      this.$emit('to-parent', this.secHistory)
      axios.get('/suggest/?key=' + this.val + '&if=mobile&platform=31&ppuid=&callback=__jp15389636642621').then(res => {
        res = res.data
        res = res.split('(')[1].split(')')[0]
        this.secArr = JSON.parse(res).data
        console.log(this.secArr)
        this.$emit('sendSecArr', this.secArr)
      })
    }
  },
  watch: {
    val (val, oldVal) {
      if (this.val !== '') {
        this.searchQuery()
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .header{
    @include justify-content(space-around);
    .sec{
      @include fullscreen(null, relative);
      .mint-search{
        @include background-color(#2e2e30);
        .mint-searchbar{
          @include background-color(#2e2e30);
          .mint-searchbar-inner{
            @include background-color(#2e2e30);
            i{
              @include font-size(.2rem);
            }
            input{
              @include padding(0);
              @include margin(0);
            }
          }
        }
      }
      input{
        @include margin(.09rem 0 0 0);
        @include border(1px,#31d231,solid,null);
        @include background-color(#172b22);
        @include rect(2rem, .26rem);
        @include border-radius(.26rem);
        @include text-align();
      }
    }
    .cancel{
      @include line-height(.44rem);
      @include font-size(.16rem);
      @include text-color(#31d231);
    }
  }
</style>
