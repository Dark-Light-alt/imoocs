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
        path: '/monographDetials',
        name: 'MonographDetials',
        component: () => import('../components/MonographDetials'),
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
          }
        ]
      }
    ]
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: () => import('../views/Refresh')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../components/Article')
  }
]

const router = new VueRouter({
  routes
})

export default router
