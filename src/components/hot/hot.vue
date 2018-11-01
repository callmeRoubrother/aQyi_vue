<template>
  <div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" topLoadingText="更新中..." bottomPullText="上拉加载" bottomDropText="释放加载" :autoFill="false">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="img_cover">
            <img :src="item.thumbnail" alt="">
            <div class="cover">
              <h2>{{ item.feedTitle }}</h2>
              <p><span>{{ item.playCount }}次播放</span><span>{{ item.duration }}</span></p>
            </div>
          </div>
          <div class="info_cover">
            <span>泡泡圈: <em>{{ item.name }}</em></span>
            <div>
              <ul>
                <li>
                  <i class="iconfont icon-xinxi"></i>
                  <span>{{ item.commentCount == 0 ? "" :item.commentCount }}</span>
                </li>
                <li>
                  <i class="iconfont icon-xin"></i>
                  <span>{{ item.agreeCount == 0 ? "" :item.agreeCount }}</span>
                </li>
                <li>
                  <i class="iconfont icon-fenxiang2"></i>
                </li>
                <li>
                  <i class="iconfont icon-gaoxiao01"></i>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Loadmore } from 'mint-ui'

Vue.use(Loadmore)
Vue.prototype.$http = axios
export default {
  data () {
    return {
      allLoaded: true,
      list: [],
      num: 0
    }
  },
  methods: {
    loadTop () {
      this.num = 0
      axios.get('/aqiyi/h5/bubble/hotFeeds.json?upOrDown=' + this.num).then(res => {
        this.list = res.data.data.feeds
        this.allLoaded = false
        this.$refs.loadmore.onTopLoaded()
      }).catch(err => console.log(err))
    },
    loadBottom () {
      this.num += 1
      axios.get('/aqiyi/h5/bubble/hotFeeds.json?upOrDown=' + this.num).then(res => {
        this.list = [...this.list, ...res.data.data.feeds]
        console.log(this.list)
        this.$refs.loadmore.onBottomLoaded()
      }).catch(err => console.log(err))
    }
  },
  created () {
    this.loadTop()
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .mint-loadmore{
    ul{
      @include rect(100%, auto);
      li{
        .img_cover{
          @include fullscreen(null, relative);
          img{
            @include rect(100%, 2.1rem);
          }
          .cover{
            @include rect(100%, 100%);
            @include fullscreen();
            @include flexbox();
            @include flex-direction(column);
            @include justify-content(space-between);
            h2{
              background-color: rgba(0, 0, 0, 0.3);
              @include font-size(.18rem);
              @include text-color(white);
            }
            p{
              @include padding(0 .08rem);
              @include flexbox();
              @include justify-content(space-between);
              background-color: rgba(0, 0, 0, 0.3);
              @include text-align(right);
              @include text-color(white);
              @include font-size(.14rem);
            }
          }
        }
        .info_cover{
          @include flexbox();
          @include justify-content(space-between);
          @include rect(100%, .55rem);
          @include line-height(.55rem);
          em{
            @include text-color(#31d231);
          }
          div{
            ul{
              @include flexbox();
              li{
                @include rect(.34rem, 100%);
                @include margin(0 .05rem);
                @include fullscreen(null, relative);
                i{
                  @include font-size(.18rem);
                }
                span{
                  @include fullscreen();
                  @include font-size(.12rem);
                  @include rect(.14rem, .09rem);
                  @include text-color(#31d231);
                  top:-0.1rem;
                  left: .1rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
