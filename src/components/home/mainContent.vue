<template>
  <div class="main_content">
    <slot name="h2"></slot>
    <ul>
      <li v-for="(item, index) in List" :key="index" @click="gotoVariety(item.albumId, 0, item.videoId, item.pageUrl)">
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
        <p class="subtit">{{ item.subtitle }}</p>
      </li>
    </ul>
    <slot name="more"></slot>
  </div>
</template>

<script>
export default {
  props: ['List'],
  data () {
    return {

    }
  },
  methods: {
    gotoVariety (id, id2, num, url) {
      // console.log(this)
      url = url.split('com/')[1]
      this.$router.push({ path: `variety/${id}/${id2}/${num}/${url}` })
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .main_content{
    @include border(0 0 .02rem 0, #ccc, solid, null);
    @include padding(.1rem 0);
    ul{
      @include flexbox();
      @include flex-flow(wrap);
      @include justify-content(space-between);
      li{
        @include fullscreen(null, relative);
        @include rect(49.5%, 1.5rem);
        @include overflow(hidden);
        .cover{
          @include rect(100%, 1.3rem);
          .img_cover{
            @include rect(100%, 100%);
            img{
              @include rect(100%, auto);
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
