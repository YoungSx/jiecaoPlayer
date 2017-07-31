import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Client'
import XHR from '@/components/XHR'

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
    }
  ]
})
