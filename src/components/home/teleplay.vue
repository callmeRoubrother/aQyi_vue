<template>
  <div class="teleplay">
    <slot name="h2"></slot>
    <ul>
      <li v-for="(item, index) in List" :key="index" @click="toDetail(item.albumId, item.videoId)">
        <div class="cover">
          <div class="img_cover">
            <img v-lazy="item.imageUrl" alt="" class="item_img">
          </div>
          <div class="vip_cover">
            <img :src="item.payMarkUrl" alt="">
            <p>{{ item.lowerRightCorner }}</p>
          </div>
        </div>
        <p>{{ item.mainTitle }}</p>
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
    },
    toDetail (id, id2) {
      this.$router.push({ path: `detail/${id}/${id2}` })
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .teleplay{
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
        @include rect(33%, 2.1rem);
        p{
          @include ellipsis();
          @include rect(100%, .4rem);
          @include padding(.2rem 0 0 .08rem);
          @include font-size(.14rem);
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
          img{
            @include rect(.4rem, .2rem);
          }
          p{
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
