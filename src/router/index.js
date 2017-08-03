import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Client'
import XHR from '@/components/XHR'
import Flv from '@/components/Flv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/XHR',
      name: 'XHR',
      component: XHR
    },
    {
      path: '/Flv',
      name: 'Flv',
      component: Flv
    }
  ]
})
