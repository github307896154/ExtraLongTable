import Vue from 'vue'
import Router from 'vue-router'
import showTable from '@/module/showTable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showTable',
      component: showTable
    }
  ]
})
