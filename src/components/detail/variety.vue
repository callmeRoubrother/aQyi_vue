<template>
  <div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" topLoadingText="更新中..." bottomPullText="上拉加载" bottomDropText="释放加载" :autoFill="false">
      <div>
        <video :src="videoUrl" class="logoImg" :poster="bigImg" controls="controls"></video>
        <span class="iconfont icon-fanhuidaohanglan" id="back" @click="back()"></span>
        <div class="info">
          <h2>{{ videoData.latestVideoName }}</h2>
          <span @click="showDesc">简介</span>
        </div>
        <div class="desc" style="display: none;">{{ videoData.desc }}</div>
      </div>
      <div class="paopao">
        <div class="left">
          <img src="//www.iqiyipic.com/common/fix/h5-aura/video-pp.png" alt="">
          <span>泡泡： {{ (hotCount / 10000).toFixed(1) }}万</span>
        </div>
        <div class="right">
          <div>
            <i class="iconfont icon-xiazai"></i>
            <p>下载</p>
          </div>
          <div>
            <i class="iconfont icon-fenxiang2"></i>
            <p>分享</p>
          </div>
          <div>
            <i class="iconfont icon-fenxiang1"></i>
            <p>更多</p>
          </div>
        </div>
      </div>
      <div class="recommend">
        <h2>为你推荐</h2>
        <ul>
          <li v-for="(item, index) in surround" :key="index">
            <img v-lazy="item.imageUrl" alt="">
            <div class="cover">
              <h3>{{ item.shortTitle }}</h3>
              <i class="iconfont icon-bofang"></i>
              <div class="bottom">
                <span>热度 {{ item.hotNum }}</span>
                <span>{{ item.duration }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="circle">
        <img :src="smallImg" alt="">
        <div class="middle">
          <h2>{{ Tit }}</h2>
          <p>{{ friends }}圈友</p>
          <p>{{ (hotCount / 10000).toFixed(1) }}万剧情评论</p>
        </div>
        <span>去圈子</span>
      </div>
      <div class="commend">
        <ul>
          <li v-for="(item, index) in commend" :key="index">
            <div class="userImg">
              <img :src="item.icon" alt="">
              <div class="name">
                <p>{{ item.name }}</p>
                <span>{{ item.uvCount }}人阅读</span>
              </div>
            </div>
            <div class="userDesc">
              {{ item.description }}
            </div>
            <div class="userFunc">
              <p>
                <i class="iconfont icon-fenxiang2"></i>
                <span>分享</span>
              </p>
              <p>
                <i class="iconfont icon-xinxi"></i>
                <span>{{ item.commentCount }}</span>
              </p>
              <p>
                <i class="iconfont icon-xin"></i>
                <span>{{ item.agreeCount }}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </mt-loadmore>>
  </div>
</template>

<script>
import 'jquery'
import Vue from 'vue'
import axios from 'axios'
import { Swipe, SwipeItem, Lazyload, Loadmore } from 'mint-ui'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Loadmore)
Vue.prototype.$http = axios
export default {
  data () {
    return {
      allLoaded: true,
      id: '',
      id2: '',
      videoUrl: '',
      html: '',
      cId: '',
      dataVid: '',
      bigImg: '',
      hotCount: '',
      smallImg: '',
      friends: '',
      Tit: '',
      Num: 0,
      feedId: '',
      snstime: '',
      commend: [],
      videoData: {},
      surround: []
    }
  },
  methods: {
    showDesc () {
      $('.desc').toggle()
    },
    back () {
      this.$router.back()
    },
    loadTop () {
      axios.get('/aqiyi/jp/h5/albums/' + this.id + '?callback=Zepto1539070445633').then(res => {
        res = res.data
        res = res.split('(')[1].split(')')[0]
        const data = JSON.parse(res)[0]
        this.videoData = data
        console.log(this.videoData)
        axios.get('/detail/' + this.html).then(res => {
          const reg = new RegExp(' ', 'g')
          this.cId = res.data.split('playInfo.circleId =')[1].split(';')[0].replace(reg, '')
          axios.get('/paopao/apis/e/starwall/basic_wall.action?wallId=' + this.cId + '&qypid=02000021010000000000&atoken=467ffsZiDDxxWpokCY96aFtan3Yz8dyU1nFhu2OYWbMfm2prsm4&authcookie=&agenttype=119&m_device_id=vepy4tw9b75gtfbo039fwc11&agentversion=9.2.0&_=1539085801955&callback=Zepto1539085798678').then(res => {
            res = res.data.split('(')[1].split(')')[0]
            this.bigImg = JSON.parse(res).data.posters
            this.hotCount = JSON.parse(res).data.feedCount
            this.smallImg = JSON.parse(res).data.icon
            this.friends = JSON.parse(res).data.memberCount
            this.Tit = JSON.parse(res).data.name
          })
        })
      }).catch(err => console.log(err))
      axios.get('/aqiyi/jp/h5/recommend/videos/?area=h_swan&size=30&type=video&tvid=' + this.id2 + '&referenceId=' + this.id2 + '&albumId=' + this.id2 + '&cookieId=0&channelId=6&filterStatus=1&trimUser=false&qyid=vepy4tw9b75gtfbo039fwc11&ppuid=&uid=vepy4tw9b75gtfbo039fwc11&_=1539070448178&callback=Zepto1539070445630').then(res => {
        res = res.data
        res = res.split('(')[1].split(')')
        this.surround = JSON.parse(res[0]).videos
        console.log(this.surround)
        this.allLoaded = false
        this.$refs.loadmore.onTopLoaded()
      }).catch(err => console.log(err))
    },
    loadBottom () {
      this.Num++
      this.Num === 1 ? this.snstime = '1' : this.snstime = this.snstime
      let URL = ''
      this.Num === 1 ? URL = '/varietyCommend/feed/get_feeds?wallId=' + this.cId + '&count=20&version=1&hasRecomFeed=1&top=1&snsTime=' + this.snstime + '&feedTypes=1%2C4%2C8%2C9&needTotalUser=1&needTotal=1&limitparam%5BpicNum%5D=3&authcookie=&agenttype=119&m_device_id=vepy4tw9b75gtfbo039fwc11&agentversion=9.2.0&_=' + new Date().getTime() + '&callback=Zepto1539317689472' : URL = '/varietyCommend/feed/get_feeds?wallId=' + this.cId + '&count=20&version=1&hasRecomFeed=1&top=1&snsTime=' + this.snstime + '&feedTypes=1%2C4%2C8%2C9&needTotalUser=1&needTotal=1&limitparam%5BpicNum%5D=3&authcookie=&agenttype=119&m_device_id=vepy4tw9b75gtfbo039fwc11&agentversion=9.2.0&feedId=' + this.feedId + '&upOrDown=' + (this.Num - 1) + '&_=' + new Date().getTime() + '&callback=Zepto1539426559321'
      console.log(URL)
      axios.get(URL).then(res => {
        res = res.data
        res = res.split('(')[1].split(')')[0]
        const commendData = JSON.parse(res)
        this.commend = [...this.commend, ...commendData.data.feeds]
        this.feedId = this.commend[this.commend.length - 1].feedId
        this.snstime = this.commend[this.commend.length - 1].snsTime
        console.log(this.commend, this.snstime)
        this.$refs.loadmore.onBottomLoaded()
      }).catch(err => console.log(err))
    }
  },
  created () {
    this.id = this.$route.params.id
    this.id2 = this.$route.params.id2
    this.num = this.$route.params.num
    console.log(this.id2, this.id, this.num)
    if (this.num === '1') {
      axios.get('/news/v.mp4?_=' + this.id2).then(res => {
        res = res.data.split('data:')[1].split('};')[0]
        const data = JSON.parse(res)
        this.videoUrl = data.l
        console.log(data, this.videoUrl)
      })
    }
    this.html = this.$route.params.url
    this.loadTop()
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .logoImg{
    @include rect(100%, 2.1rem);
  }
  #back{
    @include rect(.3rem, .3rem);
    @include border-radius(50%);
    background-color: rgba(123, 123, 123, 0.5);
    @include fullscreen();
    @include text-color(white);
    @include font-size(.22rem);
    @include text-align();
    @include line-height(.3rem);
    top: .44rem;
  }
  .info{
    @include flexbox();
    @include padding(.1rem .08rem);
    @include justify-content(space-between);
    h2{
      @include rect(70%, auto);
      @include font-size(.18rem);
      @include ellipsis(null, 2);
    }
    span{
      @include font-size(.16rem);
    }
  }
  .paopao{
    @include rect(100%, .5rem);
    @include flexbox();
    @include justify-content(space-between);
    .left{
      img{
        @include rect(.33rem, .37rem);
      }
      span{
        @include line-height(.5rem);
      }
    }
    .right{
      @include flexbox();
      div{
        @include text-align();
        @include margin(0 .15rem);
        i{
          @include font-size(.2rem);
        }
      }
    }
  }
  .recommend{
    h2{
      @include padding(0 0 0 .1rem);
      @include rect(100%, .5rem);
      @include font-size(.18rem);
      @include line-height(.5rem);
    }
    ul{
      li{
        @include rect(100%, 2.6rem);
        @include fullscreen(null, relative);
        img{
          @include rect(100%, 2.1rem);
        }
        .cover{
          @include rect(100%, 2.1rem);
          @include fullscreen();
          @include flexbox();
          @include flex-direction(column);
          @include justify-content(space-between);
          h3{
            @include padding(.05rem);
            @include font-size(.16rem);
            @include text-color(white);
          }
          i{
            @include font-size(.4rem);
            @include text-color(white);
            @include text-align();
          }
          .bottom{
            @include flexbox();
            @include padding(0 .1rem);
            @include justify-content(space-between);
            span{
              @include text-color(white);
            }
          }
        }
      }
    }
  }
  .circle{
    @include rect(100%, 1.2rem);
    @include padding(.1rem);
    @include flexbox();
    @include justify-content(space-between);
    img{
      @include margin(.1rem 0 0 0);
      @include rect(.8rem, .8rem);
    }
    .middle{
      h2{
        @include font-size(.18rem);
        @include margin(.1rem 0 0 0);
      }
    }
    span{
      @include rect(.8rem, .3rem);
      @include border-radius(.3rem);
      @include margin(.35rem 0 0 0);
      @include text-align();
      @include line-height(.3rem);
      @include text-color(white);
      @include background-color(#31d231);
    }
  }
  .commend{
    ul{
      li{
        @include rect(100%, 2rem);
        @include padding(0 0 0 .1rem);
        @include border(0 0 .02rem 0, #ccc, solid);
        .userImg{
          @include flexbox();
          img{
            @include rect(.4rem, .4rem);
            @include border-radius(50%);
            @include margin(0 .1rem 0 0);
          }
          .name{
            p{
              @include text-color(black);
            }
            span{
              @include text-color(#999);
            }
          }
        }
        .userDesc{
          @include rect(100%, .86rem);
          @include padding(.15rem 0 0 0);
          @include ellipsis(null, 3);
          @include line-height(.25rem);
        }
        .userFunc{
          @include rect(100%, .56rem);
          @include flexbox();
          p{
            @include flex();
            @include text-align();
            @include line-height(.56rem);
            i{
              @include font-size(.20rem);
            }
            span{
              @include font-size(.16rem);
            }
          }
        }
      }
    }
  }
</style>
