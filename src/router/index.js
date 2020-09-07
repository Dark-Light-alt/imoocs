import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home'),
      },
      {
        path: '/inform',
        name: 'Inform',
        component: () => import('../components/Inform'),
      },
      {
        path: '/freeCourse',
        name: 'FreeCourse',
        component: () => import('../components/FreeCourse'),
      },
      {
        path: '/practiceCourse',
        name: 'PracticeCourse',
        component: () => import('../components/PracticeCourse'),
      },
      {
        path: '/monograph',
        name: 'Monograph',
        component: () => import('../components/Monograph'),
      },
      {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../components/ShoppingCart'),
      },
      {
        path: '/myCourses',
        name: 'MyCourses',
        component: () => import('../components/MyCourses'),
        children: [
          {
            path: '/test',
            name: 'Test',
            component: () => import('../components/Test')
          },
        ]
      },
      {
        path: '/principalSheet',
        name: 'PrincipalSheet',
        component:()=>import('../components/Personalsetting/PrincipalSheet'),
        children: [

          {
            path: '/personalCenter',
            name: 'PersonalCenter',
            component:()=>import('../components/Personalsetting/PersonalCenter')
          },
          {
            path: '/accountbinding',
            name: 'Accountbinding',
            component:()=>import('../components/Personalsetting/Accountbinding')
          }
        ]
      }
    ]
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: () => import('../views/Refresh')
  }
]

const router = new VueRouter({
  routes
})

export default router
