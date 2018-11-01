<template>
  <div>
    <searchHeader @to-parent="getHistory" @sendSecArr="getSecArr"></searchHeader>
    <div id="beforeSec">
      <div class="secHistory">
        <h2>搜索历史 <span>清空记录</span></h2>
        <ul>
          <li v-for="(item, index) in history" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="hotsec">
        <h2>热门搜索</h2>
        <ul>
          <li v-for="(item, index) in hotSec" :key="item.click_count" @click="replaceVal(index)" class="hotQuery">
            <p>{{ index+1 }}</p>
            <span>{{ item.query }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div id="afterSec">
      <ul>
        <li v-for="(item, index) in secArr" :key="index" @click="goToResult(index)" class="secTit">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'jquery'
import searchHeader from '@/components/search/searchHeader'
export default {
  data () {
    return {
      hotSec: [],
      history: [],
      secArr: []
    }
  },
  components: {
    searchHeader
  },
  methods: {
    replaceVal (index) {
      let key = $('.hotQuery').eq(index).find('span').text()
      this.$router.push({ path: `result/${key}` })
    },
    getHistory (val) {
      this.history = val
    },
    getSecArr (val) {
      this.secArr = val
    },
    goToResult (index) {
      let key = $('.secTit').eq(index).text()
      this.$router.push({ path: `result/${key}` })
    }
  },
  created () {
    axios.get('/search/m?if=hotQuery&p=0').then(res => {
      this.hotSec = res.data.data.splice(0, 10)
      console.log(this.hotSec)
    })
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .secHistory{
    h2{
      @include font-size(.16rem);
      @include flexbox();
      @include padding(.05rem);
      @include font-weight(100);
      @include justify-content(space-between);
      span{
        @include text-color(red);
        @include font-size(.14rem);
      }
    }
  }
  .hotsec{
    h2{
      @include font-size(.16rem);
      @include padding(.05rem);
      @include font-weight(100);
      @include border(0 0 2px 0, #ccc, solid);
    }
    ul{
      @include padding(.08rem 0 0 0);
      @include flexbox();
      @include flex-flow(wrap);
      li{
        @include flexbox();
        @include padding(.1rem .05rem);
        @include rect(50%, auto);
        &:nth-child(1){
          p{
            @include background-color(#fc4646);
          }
        }
        &:nth-child(2){
          p{
            @include background-color(#fd9046);
          }
        }
        &:nth-child(3){
          p{
            @include background-color(#fec446);
          }
        }
        p{
          @include rect(.2rem, .2rem);
          @include text-align();
          @include background-color(#d9d9d9);
          @include line-height(.2rem);
          @include text-color(white);
          @include margin(0 .08rem 0 0);
        }
      }
    }
  }
  #afterSec{
    ul{
      @include rect(100%, auto);
      li{
        @include padding(0 .1rem);
        @include rect(100%, .44rem);
        @include line-height(.44rem);
        @include border(0 0 .02rem 0, #ccc, solid);
      }
    }
  }
</style>
