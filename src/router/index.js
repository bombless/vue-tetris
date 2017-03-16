import Vue from 'vue'
import Router from 'vue-router'
import Tetris from '@/components/Tetris'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tetris',
      component: Tetris
    }
  ]
})
