import Vue from 'vue'
import Router from 'vue-router'
const homeHeader = () => import('@/components/home/homeHeader')
const loginHeader = () => import('@/components/login/loginHeader')
const search = () => import('@/components/search/search')
const home = () => import('@/components/home/home')
const login = () => import('@/components/login/login')
const register = () => import('@/components/register/register')
const verify = () => import('@/components/register/verify')
const areaNum = () => import('@/components/login/areaNum')
const registerHeader = () => import('@/components/register/registerHeader')
const detail = () => import('@/components/detail/detail')
const variety = () => import('@/components/detail/variety')
const result = () => import('@/components/search/result')
const mainFooter = () => import('@/components/footer/mainFooter')
const member = () => import('@/components/member/member')
const user = () => import('@/components//userCenter/user')
const hot = () => import('@/components/hot/hot')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        path: '/home'
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        content: search
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        header: homeHeader,
        content: home,
        footer: mainFooter
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        header: loginHeader,
        content: login
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        header: registerHeader,
        content: register
      }
    },
    {
      path: '/verify',
      name: 'verify',
      components: {
        content: verify
      }
    },
    {
      path: '/areaNum',
      name: 'areaNum',
      components: {
        content: areaNum
      }
    },
    {
      path: '/detail/:id/:id2',
      name: 'detail',
      components: {
        content: detail
      }
    },
    {
      path: '/variety/:id/:id2/:num/:url',
      name: 'variety',
      components: {
        header: homeHeader,
        content: variety
      }
    },
    {
      path: '/result/:key',
      name: 'result',
      components: {
        content: result
      }
    },
    {
      path: '/hot',
      name: 'hot',
      components: {
        header: homeHeader,
        content: hot,
        footer: mainFooter
      }
    },
    {
      path: '/member',
      name: 'member',
      components: {
        header: homeHeader,
        content: member,
        footer: mainFooter
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        content: user,
        footer: mainFooter
      }
    }
  ]
})
