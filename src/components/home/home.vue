<template>
  <div>
    <section class="sec">
      <form action="">
        <input type="text" v-model="hotMessage" @click="gotoSearch()">
        <div>
          <p class="iconfont icon-sousuo"></p>
        </div>
      </form>
      <span class="iconfont icon-shizhongclock74"></span>
      <span class="iconfont icon-jia1"></span>
    </section>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" topLoadingText="更新中..." bottomPullText="上拉加载" bottomDropText="释放加载" :autoFill="false">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for=" (item, index) in bannerImg" :key="index">
          <div class="banner_cover">
            <img v-lazy="item.imageUrl" alt="" class="banner">
          </div>
          <div class="info_cover">
            <img v-lazy="item.payMarkUrl" alt="" class="vip">
            <p>
              <span>{{ item.mainTitle }}</span>
              <span>{{item.lowerRightCorner }}</span>
            </p>
          </div>
        </mt-swipe-item>
      </mt-swipe>
      <div class="impact">
        <ul>
          <li v-for="(item, index) in impactImg" :key="index">
            <img :src="item.imageUrl" alt="">
            <p>{{ item.mainTitle }}</p>
          </li>
        </ul>
      </div>
      <mainContent :List="video2"></mainContent>
      <news :List="video3" :List1="video4">
        <h2Tit :message="video_3_Message" slot="h2"></h2Tit>
        <more slot="more" :message="video_3_Message"></more>
      </news>
      <div id="content2" style="display: none">
        <teleplay :List="teleplay" :message="teleplayTit">
          <h2Tit slot="h2" :message="teleplayTit"></h2Tit>
          <more slot="more" :message="teleplayTit"></more>
        </teleplay>
        <teleplay :List="movie" :message="movieTit">
          <h2Tit slot="h2" :message="movieTit"></h2Tit>
          <more slot="more" :message="movieTit"></more>
        </teleplay>
        <teleplay :List="cartoom" :message="cartoomTit">
          <h2Tit slot="h2" :message="cartoomTit" :classMessage="11111"></h2Tit>
          <noChangeMore slot="more" :message="cartoomTit"></noChangeMore>
        </teleplay>
        <mainContent :List="variety">
          <h2Tit slot="h2" :message="varietyTit"></h2Tit>
          <noChangeMore slot="more" :message="varietyTit"></noChangeMore>
        </mainContent>
        <mainContent :List="funny">
          <h2Tit slot="h2" :message="funnyTit"></h2Tit>
          <noChangeMore slot="more" :message="funnyTit"></noChangeMore>
        </mainContent>
        <onlineLive :List="online" :message="onlineTit">
          <h2Tit slot="h2" :message="onlineTit"></h2Tit>
          <noChangeMore slot="more" :message="onlineTit"></noChangeMore>
        </onlineLive>
        <mainContent :List="original" :message="originalTit">
          <h2Tit slot="h2" :message="originalTit"></h2Tit>
          <more slot="more" :message="originalTit"></more>
        </mainContent>
      </div>
      <div id="content3" style="display: none;">
        <content3 :List="nadou" :message="nadouTit">
          <h2Tit slot="h2" :message="nadouTit"></h2Tit>
          <noChangeMore slot="more" :message="nadouTit"></noChangeMore>
        </content3>
        <content3 :List="game" :message="gameTit">
          <h2Tit slot="h2" :message="gameTit"></h2Tit>
          <noChangeMore slot="more" :message="gameTit"></noChangeMore>
        </content3>
        <content3 :List="child" :message="childTit">
          <h2Tit slot="h2" :message="childTit"></h2Tit>
          <noChangeMore slot="more" :message="childTit"></noChangeMore>
        </content3>
        <content3 :List="muyin" :message="muyinTit">
          <h2Tit slot="h2" :message="muyinTit"></h2Tit>
          <noChangeMore slot="more" :message="muyinTit"></noChangeMore>
        </content3>
        <content3 :List="edcation" :message="edcationTit">
          <h2Tit slot="h2" :message="edcationTit"></h2Tit>
          <noChangeMore slot="more" :message="edcationTit"></noChangeMore>
        </content3>
        <teleplay :List="documentary" :message="documentaryTit">
          <h2Tit slot="h2" :message="documentaryTit"></h2Tit>
          <noChangeMore slot="more" :message="documentaryTit"></noChangeMore>
        </teleplay>
        <recommend :List="recommend" :message="recommendTit">
          <h2Tit slot="h2" :message="recommendTit"></h2Tit>
        </recommend>
        <content3 :List="life" :message="lifeTit">
          <h2Tit slot="h2" :message="lifeTit"></h2Tit>
          <noChangeMore slot="more" :message="lifeTit"></noChangeMore>
        </content3>
        <content3 :List="health" :message="healthTit">
          <h2Tit slot="h2" :message="healthTit"></h2Tit>
          <noChangeMore slot="more" :message="healthTit"></noChangeMore>
        </content3>
        <content3 :List="sport" :message="sportTit">
          <h2Tit slot="h2" :message="sportTit"></h2Tit>
          <noChangeMore slot="more" :message="sportTit"></noChangeMore>
        </content3>
        <content3 :List="fashion" :message="fashionTit">
          <h2Tit slot="h2" :message="fashionTit"></h2Tit>
          <noChangeMore slot="more" :message="fashionTit"></noChangeMore>
        </content3>
        <content3 :List="laughter" :message="laughterTit">
          <h2Tit slot="h2" :message="laughterTit"></h2Tit>
          <noChangeMore slot="more" :message="laughterTit"></noChangeMore>
        </content3>
      </div>
      <div id="content4" style="display: none;">
        <content3 :List="pianhua" :message="pianhuaTit">
          <h2Tit slot="h2" :message="pianhuaTit"></h2Tit>
          <noChangeMore slot="more" :message="pianhuaTit"></noChangeMore>
        </content3>
        <content3 :List="music" :message="musicTit">
          <h2Tit slot="h2" :message="musicTit"></h2Tit>
          <noChangeMore slot="more" :message="musicTit"></noChangeMore>
        </content3>
        <content3 :List="travel" :message="travelTit">
          <h2Tit slot="h2" :message="travelTit"></h2Tit>
          <noChangeMore slot="more" :message="travelTit"></noChangeMore>
        </content3>
        <content3 :List="military" :message="militaryTit">
          <h2Tit slot="h2" :message="militaryTit"></h2Tit>
          <noChangeMore slot="more" :message="militaryTit"></noChangeMore>
        </content3>
        <content3 :List="finance" :message="financeTit">
          <h2Tit slot="h2" :message="financeTit"></h2Tit>
          <noChangeMore slot="more" :message="financeTit"></noChangeMore>
        </content3>
        <content3 :List="car" :message="carTit">
          <h2Tit slot="h2" :message="carTit"></h2Tit>
          <noChangeMore slot="more" :message="carTit"></noChangeMore>
        </content3>
        <content3 :List="science" :message="scienceTit">
          <h2Tit slot="h2" :message="scienceTit"></h2Tit>
          <noChangeMore slot="more" :message="scienceTit"></noChangeMore>
        </content3>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import axios from 'axios'
import mainContent from '@/components/home/mainContent'
import more from '@/components/home/more'
import content3 from '@/components/home/content3'
import recommend from '@/components/home/recommend'
import noChangeMore from '@/components/home/noChangeMore'
import h2Tit from '@/components/home/h2Tit'
import teleplay from '@/components/home/teleplay'
import onlineLive from '@/components/home/onlineLive'
import news from '@/components/home/news'
import { Swipe, SwipeItem, Lazyload, Loadmore, Toast, Indicator } from 'mint-ui'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Loadmore)
export default {
  data () {
    return {
      allLoaded: true,
      hotSec: [],
      num: 1,
      hotMessage: '',
      video_3_Message: '',
      bannerImg: [],
      impactImg: [],
      video2: [],
      video3: [],
      video4: [],
      teleplayTit: '',
      teleplay: [],
      movieTit: '',
      movie: [],
      cartoomTit: '',
      cartoom: [],
      varietyTit: '',
      variety: [],
      funnyTit: '',
      funny: [],
      onlineTit: '',
      online: [],
      originalTit: '',
      original: [],
      nadouTit: '',
      nadou: [],
      gameTit: '',
      game: [],
      childTit: '',
      child: [],
      muyinTit: '',
      muyin: [],
      edcationTit: '',
      edcation: [],
      documentaryTit: '',
      documentary: [],
      recommendTit: '',
      recommend: [],
      lifeTit: '',
      life: [],
      healthTit: '',
      health: [],
      sportTit: '',
      sport: [],
      laughterTit: '',
      laughter: [],
      fashionTit: '',
      fashion: [],
      pianhuaTit: '',
      pianhua: [],
      musicTit: '',
      music: [],
      travelTit: '',
      travel: [],
      militaryTit: '',
      military: [],
      financeTit: '',
      finance: [],
      carTit: '',
      car: [],
      scienceTit: '',
      science: []
    }
  },
  components: {
    mainContent,
    news,
    more,
    h2Tit,
    noChangeMore,
    teleplay,
    content3,
    recommend,
    onlineLive
  },
  methods: {
    loadTop () {
      Indicator.open()
      this.num = 1
      axios.get('/aqiyi/h5/main/index/' + this.num + '/?callback=__jp15384869846750').then(res => {
        res = res.data
        res = res.split('(')[1].split(')')[0]
        const data = JSON.parse(res).data
        this.bannerImg = data.cards[0].videos
        this.impactImg = data.cards[1].videos
        this.video2 = data.cards[2].videos
        this.video_3_Message = data.cards[3].cardName
        this.video3 = data.cards[3].videos
        this.video4 = data.cards[4].videos
        this.hotSec = JSON.parse(data.hotQuery)
        this.randomHot(this.hotSec.length - 1)
        this.allLoaded = false
        this.$refs.loadmore.onTopLoaded()
        Indicator.close()
      }).catch(err => console.log(err))
    },
    loadBottom () {
      this.num += 1
      axios.get('/aqiyi/h5/main/index/' + this.num + '/?callback=__jp15384869846750').then(res => {
        if (this.num === 5) {
          this.allLoaded = true
          Toast({
            message: '已无更多数据',
            position: 'bottom',
            duration: 5000
          })
        } else {
          res = res.data
          res = res.split('(')[1].split(')')[0]
          const data = JSON.parse(res).data
          console.log(data)
          if (this.num === 2) {
            console.log(data)
            document.getElementById('content2').style.display = 'block'
            this.teleplayTit = data.cards[0].cardName
            this.teleplay = data.cards[0].videos.splice(0, 6)
            this.movieTit = data.cards[1].cardName
            this.movie = data.cards[1].videos.splice(0, 6)
            this.cartoomTit = data.cards[2].cardName
            this.cartoom = data.cards[2].videos.splice(0, 6)
            this.varietyTit = data.cards[3].cardName
            this.variety = data.cards[3].videos.splice(0, 6)
            this.funnyTit = data.cards[4].cardName
            this.funny = data.cards[4].videos.splice(0, 4)
            this.onlineTit = data.cards[5].cardName
            this.online = data.cards[5].videos.splice(0, 3)
            this.originalTit = data.cards[6].cardName
            this.original = data.cards[6].videos.splice(0, 6)
          }
          if (this.num === 3) {
            console.log('3333333333')
            document.getElementById('content3').style.display = 'block'
            this.nadouTit = data.cards[0].cardName
            this.nadou = data.cards[0].videos.splice(0, 2)
            this.gameTit = data.cards[1].cardName
            this.game = data.cards[1].videos.splice(0, 4)
            this.childTit = data.cards[2].cardName
            this.child = data.cards[2].videos.splice(0, 4)
            this.muyinTit = data.cards[3].cardName
            this.muyin = data.cards[3].videos.splice(0, 4)
            this.edcationTit = data.cards[4].cardName
            this.edcation = data.cards[4].videos.splice(0, 4)
            this.documentaryTit = data.cards[5].cardName
            this.documentary = data.cards[5].videos.splice(0, 6)
            this.recommendTit = data.cards[6].cardName
            this.recommend = data.cards[6].videos.splice(0, 2)
            this.lifeTit = data.cards[7].cardName
            this.life = data.cards[7].videos.splice(0, 4)
            this.healthTit = data.cards[8].cardName
            this.health = data.cards[8].videos.splice(0, 4)
            this.sportTit = data.cards[9].cardName
            this.sport = data.cards[9].videos.splice(0, 4)
            this.fashionTit = data.cards[10].cardName
            this.fashion = data.cards[10].videos.splice(0, 4)
            this.laughterTit = data.cards[11].cardName
            this.laughter = data.cards[11].videos.splice(0, 4)
          }
          if (this.num === 4) {
            document.getElementById('content4').style.display = 'block'
            this.pianhuaTit = data.cards[0].cardName
            this.pianhua = data.cards[0].videos.splice(0, 2)
            this.musicTit = data.cards[1].cardName
            this.music = data.cards[1].videos.splice(0, 2)
            this.travelTit = data.cards[2].cardName
            this.travel = data.cards[2].videos.splice(0, 2)
            this.militaryTit = data.cards[3].cardName
            this.military = data.cards[3].videos.splice(0, 2)
            this.financeTit = data.cards[4].cardName
            this.finance = data.cards[4].videos.splice(0, 2)
            this.carTit = data.cards[5].cardName
            this.car = data.cards[5].videos.splice(0, 2)
            this.scienceTit = data.cards[6].cardName
            this.science = data.cards[6].videos.splice(0, 2)
          }
        }
        this.$refs.loadmore.onBottomLoaded()
      }).catch(err => console.log(err))
    },
    randomHot (max, min) {
      min = min || 0
      let random = Math.round(Math.random() * (max - min) + min)
      this.hotMessage = this.hotSec[random]
    },
    gotoSearch () {
      this.$router.push({ path: `search` })
    }
  },
  mounted () {
    this.loadTop()
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .sec{
    @include rect(100%, .34rem);
    @include background-color(#2e2e30);
    @include flexbox();
    @include justify-content(space-around);
    form{
      @include rect(80%, .34rem);
      @include flexbox();
      div{
        p{
          @include rect(100%, 100%);
          @include text-color(#06b906);
          @include line-height(.34rem);
          @include font-size(.3rem);
        }
      }
      input{
        @include rect(90%, 80%);
        @include text-color(#99989d);
        @include text-align();
        @include border();
        @include border-radius(.34rem);
        @include background-color(#38373c);
      }
    }
    span{
      @include text-color(#ccc);
      @include font-size(.22rem);
    }
  }
  .mint-swipe{
    @include rect(100%, 2rem);
    @include fullscreen(null, relative);
    .banner_cover{
      @include rect(100%, 100%);
      @include padding(.1rem 0 0 0);
      @include background-color(#2e2e30);
      .banner{
        @include rect(100%, auto);
      }
    }
    .info_cover{
      @include rect(100%, 100%);
      @include fullscreen(999, absolute);
      @include flexbox();
      @include flex-direction(column);
      @include justify-content(space-between);
      .vip{
        @include rect(.4rem, .2rem);
        @include margin(.1rem 0 0 0);
      }
      p{
        @include rect(100%, auto);
        @include flexbox();
        @include justify-content(space-around);
        span{
          @include text-color(white);
        }
      }
    }
  }
  .impact{
    @include rect(100%, 1rem);
    @include padding(.1rem .1rem);
    @include overflow();
    ul{
      @include rect(100%, 100%);
      @include flexbox();
      @include justify-content(space-between);
      li{
        @include rect(auto, 100%);
        @include text-align();
        @include margin(0 .1rem);
        img{
          @include rect(.4rem, .4rem);
        }
        p{
          @include wrap(false);
        }
      }
    }
  }
</style>
