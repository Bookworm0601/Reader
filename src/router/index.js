import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ebook from '@/components/Ebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/ebook',
      component: Ebook
    },
    {
      path:'/ebook',
      name:'Ebook',
      component:Ebook
    }
  ]
})
