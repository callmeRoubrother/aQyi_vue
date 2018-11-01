<template>
  <div class="recommend">
    <slot name="h2"></slot>
    <ul>
      <li v-for="(item, index) in List" :key="index">
        <img v-lazy="item.imageUrl" alt="" class="item_img">
        <p>{{ item.mainTitle }}</p>
        <div class="adv">
          <img :src="item.kvs.appicon" alt="">
          <span>{{ item.kvs.appname }}</span>
        </div>
      </li>
    </ul>
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
  .recommend{
    @include border(0 0 .02rem 0, #ccc, solid, null);
    @include padding(.1rem 0);
    ul{
      @include flexbox();
      @include flex-flow(wrap);
      @include justify-content(space-between);
      li {
        @include fullscreen(null, relative);
        @include rect(49.5%, 1.8rem);
        @include overflow(hidden);
        .item_img{
          @include rect(100%, 1.2rem);
        }
        p{
          @include text-align();
          @include rect(100%, .2rem);
        }
        .adv{
          @include rect(100%, .3rem);
          @include text-align();
          @include line-height(.3rem);
          img{
            @include rect(.24rem, .24rem);
          }
        }
      }
    }
  }
</style>
