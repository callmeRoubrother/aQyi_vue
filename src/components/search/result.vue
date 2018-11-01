<template>
  <div>
    <searchHeader></searchHeader>
    <div class="search_get">
      <div class="left" @click="goToDetail(id, id2)">
        <img :src="logoImg" alt="">
        <div class="cover">
          <img :src="vipImg" alt="">
          <span>更新至{{ newest_item_number }}集</span>
        </div>
      </div>
      <div class="right">
        <h3>{{ tit }}</h3>
        <p>{{ year }} {{ kind }} {{ area }} {{ lang }}</p>
        <p>主演： {{star}}</p>
        <p>类型： {{ type }}</p>
        <div class="play_cover">
          <div class="play_now" @click="goToDetail(id, id2)">立即播放</div>
          <div class="download">下载</div>
        </div>
      </div>
    </div>
    <div class="selections">
      <ul>
        <li>1</li>
        <li>...</li>
        <li>{{ lastSecondNum }}</li>
        <li>{{ lastNum }}</li>
        <li>{{ lastNum + 1 }}</li>
      </ul>
    </div>
    <div class="paopao">
      <h2>泡泡</h2>
      <div class="cover">
        <ul>
          <li v-for="item in paopao" :key="item.id">
            <img :src="item.image_url" alt="">
            <div class="info">
              <h3>{{ item.title }}</h3>
              <p>{{ (Math.round(item.circle_user_count) / 10000).toFixed(1) }}万人已关注</p>
              <p>进圈</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="novel">
      <img :src="bookImg" alt="">
      <div class="nover_info">
        <p>{{ bookTit }}</p>
        <p>{{ bookDesc }}</p>
        <p>啦啦啦</p>
      </div>
    </div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true" infinite-scroll-distance="10" class="slideContent">
      <li v-for="(item, index) in ListArr" :key="index">
        <div class="left">
          <img :src="item.itemHImage" alt="">
          <span>{{ parseInt(item.timeLength / 60) }}:{{ item.timeLength % 60 }}</span>
        </div>
        <div class="right">
          <h3>{{ item.itemTitle }}</h3>
          <p>上传者: {{ item.uploader_name }}</p>
          <p>发布时间: {{ item.initialIssueTime }}</p>
        </div>
      </li>
    </ul>
    <span class="iconfont icon-huidingbu" id="backtop" style="display: none;"></span>
  </div>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui'
import axios from 'axios'
import searchHeader from '@/components/search/searchHeader'

Vue.use(InfiniteScroll)
export default {
  data () {
    return {
      loading: false,
      logoImg: '',
      vipImg: '',
      newest_item_number: '',
      tit: '',
      year: '',
      area: '',
      lang: '',
      kind: '',
      type: '',
      star: '',
      id: '',
      id2: '',
      lastSecondNum: '',
      lastNum: '',
      paopao: [],
      bookImg: '',
      bookTit: '',
      bookDesc: '',
      ListArr: [],
      count: 5,
      num: 3
    }
  },
  methods: {
    goToDetail (id, id2) {
      this.$router.push({ path: `/detail/${id}/${id2}` })
    },
    loadMore () {
      this.num += this.count
      this.loading = true
      setTimeout(() => {
        axios.get('/search/o?if=html5&key=' + this.$route.params.key + '&pageNum=1&pageSize=20&channel_name=&u=vepy4tw9b75gtfbo039fwc11&pu=&video_allow_3rd=1&intent_result_number=10&intent_category_type=1&vfrm=2-3-0-1&callback=__jp15389615550560').then(res => {
          res = res.data
          res = res.split('(')[1].split(')')[0]
          const data = JSON.parse(res).docinfos
          for (var i = this.num; i < (this.count + this.num); i++) {
            for (var j = 0; j < data[i].albumDocInfo.videoinfos.length; j++) {
              this.ListArr.push(data[i].albumDocInfo.videoinfos[j])
            }
          }
        })
        this.loading = false
      }, 2500)
    }
  },
  components: {
    searchHeader
  },
  created () {
    axios.get('/search/o?if=html5&key=' + this.$route.params.key + '&pageNum=1&pageSize=20&channel_name=&u=vepy4tw9b75gtfbo039fwc11&pu=&video_allow_3rd=1&intent_result_number=10&intent_category_type=1&vfrm=2-3-0-1&callback=__jp15389615550560').then(res => {
      res = res.data
      res = res.split('(')[1].split(')')[0]
      const data = JSON.parse(res).docinfos
      this.logoImg = data[0].albumDocInfo.albumHImage
      this.vipImg = data[0].albumDocInfo.pay_mark_url
      this.tit = data[0].albumDocInfo.albumTitle
      this.newest_item_number = data[0].albumDocInfo.newest_item_number
      this.year = data[0].albumDocInfo.releaseDate.slice(0, 4)
      this.area = data[0].albumDocInfo.region
      this.id = data[0].albumDocInfo.albumId
      this.kind = data[0].albumDocInfo.channel.split(',')[0]
      this.lang = data[0].albumDocInfo.video_lib_meta.language[0]
      this.star = data[0].albumDocInfo.star
      this.type = data[0].albumDocInfo.video_lib_meta.category.join().replace(/,/g, ' ')
      const leng = data[0].albumDocInfo.videoinfos.length
      this.lastSecondNum = data[0].albumDocInfo.videoinfos[leng - 2].itemNumber
      this.lastNum = data[0].albumDocInfo.videoinfos[leng - 1].itemNumber
      this.paopao = data[0].albumDocInfo.circle_summaries
      this.bookImg = data[1].albumDocInfo.albumHImage
      this.bookDesc = data[0].albumDocInfo.bookSummary.description
      this.bookTit = data[1].albumDocInfo.albumTitle
      for (var i = this.num; i < (this.count + this.num); i++) {
        for (var j = 0; j < data[i].albumDocInfo.videoinfos.length; j++) {
          this.ListArr.push(data[i].albumDocInfo.videoinfos[j])
        }
      }
      console.log(data)
      axios.get('/aqiyi/jp/h5/albums/' + this.id + '?callback=Zepto1538816242687').then(res => {
        res = res.data.split('(')[1].split(')')[0]
        this.id2 = JSON.parse(res)[0].tvid
      })
    })
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  body{
    @include rect(100%, 100%);
    @include background-color(#f5f5f5);
  }
  .search_get{
    @include background-color(white);
    @include padding(.1rem);
    @include flexbox();
    .left{
      @include fullscreen(null, relative);
      img{
        @include rect(1.2rem, 1.7rem);
      }
      .cover{
        @include fullscreen();
        @include rect(100%, 100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content(space-between);
        img{
          @include rect(.44rem, .22rem);
        }
        span{
          @include rect(60%, auto);
          @include font-size(.12rem);
          @include margin(0 0 0 40%);
          @include text-color(white);
          @include background-color(#333);
          @include text-align(right);
        }
      }
    }
    .right{
      @include flex();
      @include padding(0 0 0 .15rem);
      h3{
        @include text-color(#31d231);
      }
      p{
        @include margin(.08rem 0);
        &:nth-child(3){
          @include rect(100%, .16rem);
          @include ellipsis();
        }
      }
      .play_cover{
        @include flexbox();
        @include margin(.2rem 0 0 0);
        div{
          @include rect(1rem, .4rem);
          @include text-align();
          @include line-height(.4rem);
          @include border(.02rem, #31d231, solid);
          &:nth-child(1){
            @include background-color(#31d231);
            @include text-color(white);
            @include margin(0 .1rem 0 0);
          }
          &:nth-child(2){
            @include text-color(#31d231);
          }
        }
      }
    }
  }
  .selections{
    @include background-color(white);
    @include rect(100%, .8rem);
    @include padding(0 .1rem .1rem .1rem);
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      @include justify-content(space-between);
      li{
        @include flex();
        @include margin(0 .05rem);
        @include font-size(.2rem);
        @include text-align();
        @include line-height(.8rem);
        @include background-color(#f5f5f5);
      }
    }
  }
  .paopao{
    @include background-color(white);
    @include margin(.1rem 0);
    @include rect(100%, 1.5rem);
    @include padding(0 0 .1rem .1rem);
    h2{
      @include rect(100%, .66rem);
      @include text-color(#31d231);
      @include line-height(.66rem);
    }
    .cover{
      @include overflow();
      ul{
        @include rect(100%, .77rem);
        @include flexbox();
        li{
          @include rect(auto, 100%);
          @include flexbox();
          img{
            @include rect(.77rem, .77rem);
            @include border-radius(50%);
          }
          .info{
            @include rect(100%, auto);
            @include padding(0 .1rem 0 .1rem);
            h3{
              @include wrap(nowrap);
              @include font-size(.16rem);
            }
            p{
              @include wrap(nowrap);
              @include text-color(#999);
              &:nth-child(3){
                @include rect(.77rem, .27rem);
                @include border-radius(.27rem);
                @include background-color(#31d231);
                @include text-align();
                @include line-height(.27rem);
                @include text-color(white);
              }
            }
          }
        }
      }
    }
  }
  .novel{
    @include background-color(white);
    @include flexbox();
    @include rect(100%, 2rem);
    img{
      @include rect(1.26rem, 1.7rem);
      @include margin(0 .1rem 0 0);
    }
    .nover_info{
      @include flex();
      p{
        &:nth-child(1){
          @include text-color(#31d231);
          @include font-size(.16rem);
        }
        &:nth-child(2){
          @include rect(100%, .8rem);
          @include ellipsis(null, 4);
          @include margin(.08rem 0 .1rem 0);
        }
        &:nth-child(3){
          @include rect(1rem, .4rem);
          @include background-color(#31d231);
          @include text-align();
          @include line-height(.4rem);
          @include text-color(white);
        }
      }
    }
  }
  .slideContent{
    li{
      @include flexbox();
      @include background-color(white);
      @include margin(.1rem 0);
      .left{
        @include fullscreen(null, relative);
        img{
          @include rect(1.3rem, .75rem);
        }
        span{
          @include rect(.36rem, .15rem);
          @include fullscreen();
          @include text-color(white);
          @include text-align();
          @include background-color(#999);
          @include margin(.55rem 0 0 .94rem);
        }
      }
      .right{
        @include padding(0 0 0 .15rem);
      }
    }
  }
  #backtop{
    @include rect(.4rem, .4rem);
    @include border-radius(50%);
    @include text-align();
    @include line-height(.4rem);
    @include margin(150% 0 0 90%);
    @include background-color(#999);
    @include text-color(white);
    @include font-size(.22rem);
    @include fullscreen(null, fixed);
  }
</style>
