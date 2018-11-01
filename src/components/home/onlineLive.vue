<template>
  <div class="online">
    <slot name="h2"></slot>
    <ul>
      <li v-for="(item, index) in List" :key="index">
        <div class="cover">
          <div class="img_cover">
            <img v-lazy="item.imageUrl" alt="" class="item_img">
          </div>
          <div class="vip_cover">
            <div>奇秀直播</div>
          </div>
        </div>
        <div class="info">
          <p>{{ item.mainTitle }}</p>
          <p>{{ item.onlineNum }}人在看 </p>
        </div>
      </li>
    </ul>
    <slot name="more"></slot>
  </div>
</template>

<script>
export default {
  props: ['List', 'message'],
  data () {
    return {

    }
  },
  methods: {
    changeNews () {

    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .online{
    @include border(0 0 .02rem 0, #ccc, solid, null);
    h2{
      @include font-size(.16rem);
      @include padding(.1rem .08rem);
      span{
        @include font-size(.2rem);
      }
    }
    .more{
      @include flexbox();
      @include padding(.1rem 0);
      div{
        @include text-color(#0cd105);
        @include flex();
        @include text-align();
      }
    }
    ul{
      @include flexbox();
      @include flex-flow(wrap);
      @include justify-content(space-between);
      li{
        @include fullscreen(null, relative);
        @include rect(33%, 2.2rem);
        .info{
          padding: 0;
          @include rect(100%, .4rem);
          @include flexbox();
          @include flex-direction(column);
          p{
            @include ellipsis();
            @include font-size(.16rem);
            &:nth-child(2){
              @include font-size(.14rem);
              @include text-color(#ccc);
            }
          }
        }
        .img_cover{
          @include rect(100%, 80%);
          img{
            @include rect(100%, 1.6rem);
          }
        }
        .vip_cover{
          @include rect(100%, 80%);
          @include flexbox();
          @include flex-direction(column);
          @include justify-content(space-between);
          @include fullscreen();
          @include text-align(right);
          div{
            @include rect(.6rem, .2rem);
            @include text-align();
            @include background-color(#6f0bd0);
            @include font-size(.12rem);
            @include text-color(white);
          }
        }
        p{
          @include padding(0 0 0 .1rem);
        }
        .subtit{
          @include text-color(#939393);
          @include font-size(.12rem);
        }
      }
    }
  }
</style>
