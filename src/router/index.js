import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'
import GateState from '@/components/GateState'
import Devices from '@/components/Devices'
import DeviceInformation from '@/components/DeviceInformation'
import Setting from '@/components/Setting'
import Search from '@/components/Search'
import AboutUs from '@/components/AboutUs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/index.css'
import '@/assets/icon-font/iconfont.js'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/gate',
      name: 'GateState',
      component: GateState
    },
    {
      path: '/devices',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/device',
      name: 'DeviceInformation',
      component: DeviceInformation
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    }
  ]
})
