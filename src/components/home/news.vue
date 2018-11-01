<template>
  <div class="main_content">
    <slot name="h2"></slot>
    <ol>
      <li v-for="(item, index) in List" :key="index"  @click="gotoVariety(item.albumId, item.videoId, item.pageUrl, 1)">
        <i class="iconfont icon-youjiantou"></i>
        <span>{{ item.mainTitle }}</span>
      </li>
    </ol>
    <ul>
      <li v-for="(item, index) in ImgList" :key="index" @click="gotoVariety(item.albumId, item.videoId, item.pageUrl, 1)">
        <img :src="item.imageUrl" alt="">
        <p>{{ item.mainTitle }}</p>
      </li>
    </ul>
    <slot name="more"></slot>
  </div>
</template>

<script>
export default {
  props: ['List', 'List1', 'message'],
  data () {
    return {
      flag: 0,
      ImgList: this.$props.List1,
      spliceList: []
    }
  },
  updated () {
    this.ImgList = this.$props.List1
    this.spliceList = [this.$props.List1[0], this.$props.List1[1]]
  },
  methods: {
    changeNews () {
      console.log([this.$props.List1[2], this.$props.List1[3]])
    },
    gotoVariety (id, id2, url, num) {
      url = url.split('com/')[1]
      this.$router.push({ path: `variety/${id}/${id2}/${url}/${num}` })
    }
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .main_content{
    @include border(0 0 .02rem 0, #ccc, solid, null);
    @include padding(.1rem 0);
    h2{
      @include padding(0 0 0 .1rem);
      span{
        @include text-color(#2495ff)
      }
    }
    ol{
      @include padding(0 0 0 .15rem);
      li{
        i{
          @include text-color(#2495ff);
        }
      }
    }
    ul{
      li{
        @include rect(49.5%, auto);
        img{
          @include rect(100%, auto);
        }
      }
    }
  }
</style>
