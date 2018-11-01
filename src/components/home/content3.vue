<template>
  <div class="main_content">
    <slot name="h2"></slot>
    <ul>
      <li v-for="(item, index) in List" :key="index">
        <div class="cover">
          <div class="img_cover">
            <img v-lazy="item.imageUrl" alt="">
          </div>
          <p class="time">{{ item.lowerRightCorner }}</p>
        </div>
        <p>{{ item.mainTitle }}</p>
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
          @include rect(100%, 1.2rem);
          .img_cover{
            @include rect(100%, 100%);
            img{
              @include rect(100%, 100%);
            }
          }
          .time{
            @include rect(100%, 80%);
            @include fullscreen();
            @include text-align(right);
            @include line-height(2rem);
            @include font-size(.12rem);
            @include text-color(white);
          }
        }
        p{
          @include ellipsis();
          @include rect(100%, .3rem);
          @include padding(0 0 0 .1rem);
        }
      }
    }
  }
</style>
