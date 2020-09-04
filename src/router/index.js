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
        component: () => import('../components/Home')
      },
      {
        path: '/inform',
        name: 'Inform',
        component: () => import('../components/Inform')
      },
      {
        path: '/orderCenter',
        name: 'OrderCenter',
        component: () => import('../components/OrderCenter')
      },
      {
        path: '/freeCourse',
        name: 'FreeCourse',
        component: () => import('../components/FreeCourse')
      },
      {
        path: '/freeCourseLearn',
        name: 'FreeCourseLearn',
        component: () => import('../components/FreeCourseLearn')
      },
      {
        path: '/practiceCourse',
        name: 'PracticeCourse',
        component: () => import('../components/PracticeCourse')
      },
      {
        path: '/practiceCourseBuy',
        name: 'PracticeCourseBuy',
        component: () => import('../components/PracticeCourseBuy')
      },
      {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('../components/ConfirmOrder')
      },
      {
        path: '/monograph',
        name: 'Monograph',
        component: () => import('../components/Monograph')
      },
      {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../components/ShoppingCart')
      },
      {
        path: '/myCourses',
        name: 'MyCourses',
        component: () => import('../components/MyCourses'),
        children: []
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
