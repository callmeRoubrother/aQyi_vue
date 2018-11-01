import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/components/home/store'
import hot from '@/components/hot/store'
import member from '@/components/member/store'
import login from '@/components/login/store'
import userCenter from '@/components/userCenter/store'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    home,
    hot,
    member,
    login,
    userCenter
  }
})

export default store
