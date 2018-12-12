import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage.vue'
import rolePage from '@/components/rolePage.vue'
import loginPage from '@/components/loginPage.vue'
import userPage from '@/components/userPage.vue'
import userRegist from '@/components/userRegist.vue'
Vue.use(Router);

export default new Router({
  routes: [
   {
      path:'/',
      name:'loginPage',
      component:loginPage
    },
    {
      path:'/homePage',
      name:'homePage',
      component:homePage
    },{
      path:'/rolePage',
      name:'rolePage',
      component:rolePage
    },{
      path:'/userPage',
      name:'userPage',
      component:userPage
    },{
      path:'/userRegist',
      name:'userRegist',
      component:userRegist
    }
  ]
})
