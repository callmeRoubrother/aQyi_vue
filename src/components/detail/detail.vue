<template>
  <div>
    <div class="video">
      <video src="http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4" controls="controls" :poster="imgSrc"></video>
      <!--<embed src='http://player.youku.com/player.php/sid/XMjQ4MTc0ODMyOA==/v.swf' allowFullScreen='true' quality='high' width='100%' height='100%' align='middle' allowScriptAccess='always'></embed>-->
      <!--<iframe height=100% width=100% src='http://player.youku.com/embed/XMjQ4MTc0ODMyOA==' frameborder=0 allowfullscreen="allowfullscreen"></iframe>-->
      <!--<video src="/youku/657216C4A943D71877CFE4029/03000806005BA0212BF94ACEBE117BC0CAD13B-C736-4635-8356-13C6B9A13CD3.mp4?ccode=0501&duration=393&expire=18000&psid=1fd0eee70b0a77106c03d9e9f36978dd&ups_client_netip=715840b4&ups_ts=1539394484&ups_userid=&utid=KE%2BvE2P8zBUCAXFcXcg8vIId&vid=XMzgyNzQ3OTkzNg%3D%3D&vkey=Aa5071d5429361886ec9ce477ada88eae&s=5f3577efbfbdefbfbd75&sp=400" controls="controls" :poster="imgSrc"></video>-->
      <span class="iconfont icon-fanhuidaohanglan" id="back" @click="back()"></span>
    </div>
    <div class="tit">
      <div class="left">
        <h3>{{ this.tit }}</h3>
        <p>{{ phase }}·{{ tags }}·{{ area }}</p>
      </div>
      <div class="right" @click="intro()">
        简介<span class="iconfont icon-youjiantou"></span>
      </div>
      <div class="synopsis" style="display: none;">
        <div class="tit">
          <div class="left">
            <h3>{{ this.tit }}</h3>
            <p>{{ phase }}·{{ tags }}·{{ area }}</p>
          </div>
          <div class="right" @click="hiddenIntro()">
            X
          </div>
        </div>
        <div class="actor">
          <ul>
            <li v-for="item in actor" :key="item.id">
              <img :src="item.icon" alt="">
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <p class="desc">
          <span>影片简介:</span>{{ desc }}
        </p>
      </div>
    </div>
    <div class="selectSet">
      <div class="setTit">
        <span>选集</span>
        <p>{{ vip }} <i class="iconfont icon-youjiantou"></i></p>
      </div>
      <ul>
        <li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
    <div class="ambitus">
      <div class="ambitusTit">
        <h3>周边视频</h3>
        <p>查看更多 <span class="iconfont icon-youjiantou"></span></p>
      </div>
      <div class="ambitusVideo">
        <ul>
          <li v-for="item in ambitus" :key="item.id">
            <img v-lazy="item.imageUrl" alt="">
            <span>{{ item.duration }}</span>
            <p>{{ item.shortTitle }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="youLike">
      <h3>猜你喜欢</h3>
      <dl v-for="item in like" :key="item.id">
        <dt>
          <img :src="item.imageUrl" alt="">
          <span>{{ item.lowerRightCorner }}</span>
        </dt>
        <dd>
          <h3>{{ item.albumName }}</h3>
          <p>{{ item.vt }}</p>
          <p>热度：{{ item.hotNum }}</p>
        </dd>
      </dl>
      <h2 @click="moreLike()" id="moreLike">查看更多 <i class="iconfont icon-arrow-circle-o-down"></i></h2>
    </div>
  </div>
</template>

<script>
import 'jquery'
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      id2: '',
      dataVid: '',
      imgSrc: '',
      html: '',
      tit: '',
      phase: '',
      tags: '',
      area: '',
      actor: [],
      desc: '',
      vip: '',
      pageStatus: '',
      ambitus: [],
      like: [],
      likeStatus: [],
      allLike: []
    }
  },
  created () {
    this.id = this.$route.params.id
    this.id2 = this.$route.params.id2
    axios.get('/video/jp/tmts/' + this.id2 + '/' + this.tit + '/?uid=' + this.id + '&cupid=qc_100001_100186&platForm=h5&qyid=1qse5dxexvpiirit047tpmpu&agenttype=13&type=mp4&nolimit=&k_ft1=8&rate=1&sgti=13_1qse5dxexvpiirit047tpmpu_1539002102519&codeflag=1&preIdAll=&dfp=a042983d5664bb4d4e937051a44f6bd1e857dd88e8c28ec11a5cce2b4a4357cbb6&pv=0&qd_v=1&qdy=a&qds=0&tm=1539002102&src=02020031010000000000&vf=6ba9f25cbf152c31f796b1d20166887f&callback=tmtsCallback').then(res => {
      res = res.data.split('(')[1].split(')')[0]
      const videoData = JSON.parse(res)
      console.log(videoData)
    })
    axios.get('/aqiyi/jp/h5/albums/' + this.id + '?callback=Zepto1538816242687').then(res => {
      res = res.data.split('(')[1].split(')')[0]
      const data = JSON.parse(res)[0]
      this.tit = data.albumName
      this.phase = data.phase
      this.tags = data.tags
      this.area = data.area
      this.desc = data.desc
      this.pageStatus = data.pageStatus
      this.vip = data.updateStrategy
      console.log(data)
      this.html = data.videoUrl.split('com/')[1]
      axios.get('/detail/' + this.html).then(res => {
        const htmlId = res.data.split('playInfo.circleId')[1].split('=')[1].split(';')[0].trim()
        const reg = new RegExp(' ', 'g')
        const cId = res.data.split('playInfo.maCircleIds = [')[1].split(']')[0].replace(reg, '')
        let str = `item-data-tvid="${this.id2}"`
        this.dataVid = res.data.split(str)[1].split('data-vid="')[1].split('"')[0]
        console.log(this.dataVid)
        axios.get('/video/jp/tmts/' + this.id2 + '/' + this.dataVid + '/?uid=&cupid=qc_100001_100186&platForm=h5&qyid=1qse5dxexvpiirit047tpmpu&agenttype=13&type=mp4&nolimit=&k_ft1=8&rate=1&sgti=13_1qse5dxexvpiirit047tpmpu_' + new Date().getTime() + '&codeflag=1&preIdAll=&dfp=a042983d5664bb4d4e937051a44f6bd1e857dd88e8c28ec11a5cce2b4a4357cbb6&pv=0&qd_v=1&qdy=a&qds=0&tm=' + Math.round(new Date().getTime() / 1000) + '&src=02020031010000000000&vf=99d7924fb62436e1e109adef457411f3&callback=tmtsCallback').then(res => {
          console.log(res)
        })
        axios.get('/paopao/apis/e/starwall/wallBaseInfos.action?m_device_id=4ed2efb7d82c346a294197b8bb61807d&agenttype=119&agentversion=9.2.0&atoken=42d7f4au6HLTCNAP2d6ioI42oZ2o2lDRdCQZTysOxbDPgGzAm4&cIds=' + cId + '&_=1538836523057&callback=Zepto1538836519900').then(res => {
          res = res.data.split('(')[1].split(')')[0]
          this.actor = JSON.parse(res).data
          console.log(this.actor)
        })
        axios.get('/paopao/apis/e/starwall/basic_wall.action?wallId=' + htmlId + '&qypid=02000021010000000000&atoken=42d7f4au6HLTCNAP2d6ioI42oZ2o2lDRdCQZTysOxbDPgGzAm4&authcookie=&agenttype=119&m_device_id=4ed2efb7d82c346a294197b8bb61807d&agentversion=9.2.0').then(res => {
          res = res.data
          this.imgSrc = res.data.posters
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    axios.get('/aqiyi/jp/h5/recommend/videos/?area=h_zebra&size=12&type=video&channelId=2&cid=2&aid=' + this.id + '&tvid=' + this.id2 + '&referenceId=' + this.id2 + '&albumId=' + this.id + '&userId=0&tids=20101%2C15%2C24%2C21&trimUser=false&qyid=4ed2efb7d82c346a294197b8bb61807d&_=1538836522582&callback=Zepto1538836519894').then(res => {
      res = res.data.split('(')[1].split(')')[0]
      this.ambitus = JSON.parse(res).videos
      console.log(this.ambitus)
    })
    axios.get('/aqiyi/jp/h5/recommend/videos/?page=1&size=16&area=h_bee&entitySource=ppc&referenceId=' + this.id2 + '&channelId=2&albumId=&onlyAlbum=true&qyid=4ed2efb7d82c346a294197b8bb61807d&filterStatus=1&_=1538836522599&callback=Zepto1538836519897').then(res => {
      res = res.data.split('(')[1].split(')')[0]
      this.like = JSON.parse(res).videos.splice(0, 3)
      this.likeStatus = JSON.parse(res).videos.splice(0, 3)
      this.allLike = JSON.parse(res).videos
      console.log(this.allLike)
    })
  },
  methods: {
    intro () {
      $('.synopsis').show()
    },
    hiddenIntro () {
      $('.synopsis').hide()
    },
    moreLike () {
      if ($('#moreLike').find('i').hasClass('icon-arrow-circle-o-down')) {
        this.like = this.allLike
        $('#moreLike').html('收起<i class="iconfont icon-arrow-up-line"></i>')
      } else {
        this.like = this.likeStatus
        $('#moreLike').html('查看更多<i class="iconfont icon-arrow-circle-o-down"></i>')
      }
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .video{
    @include fullscreen(null, relative);
    @include rect(100%, 2.5rem);
    video{
      @include fullscreen();
      @include rect(100%, 100%);
    }
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
  }
  .tit{
    @include rect(100%, .7rem);
    @include padding(.1rem);
    @include flexbox();
    @include fullscreen(null, relative);
    @include justify-content(space-between);
    .left{
      h3{
        @include font-size(.2rem);
      }
    }
  }
  .selectSet{
    @include padding(.1rem);
    .setTit{
      @include flexbox();
      @include justify-content(space-between);
      span{
        @include font-size(.16rem);
        @include font-weight(700);
      }
      p{
        @include font-size(.12rem);
        i{
          @include font-size(.12rem);
        }
      }
    }
    ul{
      @include flexbox();
      @include justify-content(space-between);
      li{
        @include rect(.5rem, .5rem);
        @include background-color(#ccc);
        @include text-align();
        @include line-height(.5rem);
        @include font-size(.18rem);
        @include font-weight();
        &.active{
          @include text-color(#31d231);
        }
      }
    }
  }
  .ambitus{
    @include padding(.1rem);
    .ambitusTit{
      @include flexbox();
      @include justify-content(space-between);
      p{
        @include font-size(.12rem);
      }
    }
    .ambitusVideo{
      @include rect(100%, 1.5rem);
      @include overflow();
      ul{
        @include rect(100%, auto);
        @include flexbox();
        li{
          @include fullscreen(null, relative);
          @include margin(0 .05rem 0 0);
          @include rect(33%, 1rem);
          img{
            @include rect(1.3rem, .75rem);
          }
          span{
            @include fullscreen();
            @include text-color(white);
            @include margin(.55rem 0 0 .9rem);
          }
          p{
            @include wrap();
            @include rect(100%, .4rem);
            @include ellipsis(null, 2);
          }
        }
      }
    }
  }
  .youLike{
    @include padding(.1rem);
    dl{
      @include flexbox();
      @include margin(.05rem 0);
      dt{
        @include fullscreen(null, relative);
        img{
          @include rect(1.3rem, .75rem);
        }
        span{
          @include rect(100%, .14rem);
          @include fullscreen();
          @include margin(.6rem 0 0 0);
          @include text-align(right);
          @include text-color(white);
        }
      }
      dd{
        @include padding(0 0 0 .15rem);
        h3{
          @include font-size(.16rem);
        }
      }
    }
    h2{
      @include rect(100%, .44rem);
      @include line-height(.44rem);
      @include background-color(#666);
      @include text-align();
      @include text-color(#31d231);
    }
  }
  .synopsis{
    @include rect(100%, 4.5rem);
    top:.7rem;
    @include fullscreen(999, absolute);
    @include background-color(white);
    .actor{
      @include rect(100%, auto);
      @include overflow();
      ul{
        @include flexbox();
        @include justify-content(space-between);
        li{
          @include margin(0 .1rem);
          @include rect(20%, 100%);
          @include text-align();
          img{
            @include rect(.6rem, .6rem);
            @include border-radius(50%);
          }
        }
      }
    }
    .desc{
      @include padding(.1rem);
      span{
        @include font-weight(700);
      }
    }
  }
</style>
