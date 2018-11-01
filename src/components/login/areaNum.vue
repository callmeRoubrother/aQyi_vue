<template>
  <div>
    <header class="header">
      <span class="back iconfont icon-fanhuidaohanglan" @click="back"></span>
      <p>地区</p>
      <em></em>
    </header>
    <mt-index-list>
      <mt-index-section v-for="(item, index) in areaList" :key="index" :index="item.letter">
        <mt-cell :title="itm.name" v-for="itm in item.cities" :key="itm.id" @click.native="selectCity(itm)"></mt-cell>
      </mt-index-section>
    </mt-index-list>

  </div>
</template>

<script>
import Vue from 'vue'
import { Header, IndexList, IndexSection } from 'mint-ui'
import { mapState, mapActions } from 'vuex'

Vue.use(Header, IndexList, IndexSection)
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      areaList: state => state.login.areaList
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    selectCity (item) {
      this.$store.commit('changeCity', item.name)
      window.history.go(-1)
    },
    ...mapActions({
      'getAreaList': 'getAreaList'
    })
  },
  mounted () {
    this.getAreaList()
  }
}
</script>

<style lang="scss">
  @import '@/lib/reset.scss';
  .header{
    @include padding(0 .1rem);
    @include justify-content(space-between);
    @include line-height(.44rem);
    span{
      @include text-color(#9f9f9f);
    }
    p{
      @include text-color(white);
    }
  }
</style>
