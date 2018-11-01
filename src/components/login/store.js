import axios from 'axios'
import Vue from 'vue'
import { Indicator } from 'mint-ui'

Vue.use(Indicator)
export default {
  state: {
    areaList: [],
    city: '深圳'
  },
  getters: {

  },
  actions: {
    getAreaList (context) {
      Indicator.open()
      axios.get('/xunxun/city.json').then(res => {
        context.commit('changeAreaList', res.data)
        Indicator.close()
      }).catch(err => console.log(err))
    }
  },
  mutations: {
    changeCity (state, data) {
      state.city = data
    },
    changeAreaList (state, data) {
      state.areaList = data
    }
  }
}
