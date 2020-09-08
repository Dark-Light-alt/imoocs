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
        path: '/courseLearn',
        name: 'CourseLearn',
        component: () => import('../components/CourseLearn')
      },
      {
        path: '/answer',
        name: 'Answer',
        component: () => import('../components/Answer')
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
        path: '/pay',
        name: 'Pay',
        component: () => import('../components/Pay')
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
        path: '/myLearn',
        name: 'MyLearn',
        component: () => import('../components/MyLearn'),
        children: [
          {
            path: '/myCourse',
            name: 'MyCourse',
            component: () => import('../components/MyCourse')
          },
          {
            path: '/myFavorite',
            name: 'MyFavorite',
            component: () => import('../components/MyFavorite')
          },
          {
            path: '/myMonograph',
            name: 'MyMonograph',
            component: () => import('../components/MyMonograph')
          },
          {
            path: '/myQuestionAndAnswer',
            name: 'MyQuestionAndAnswer',
            component:()=>import('../components/MyQuestionAndAnswer')
          }
        ]
      },
      {
        path: '/monographDetials',
        name: 'MonographDetials',
        component: () => import('../components/MonographDetials'),
      }
    ]
  },
  {
    path: '/principalSheet',
    name: 'PrincipalSheet',
    component: () => import('../components/Personalsetting/PrincipalSheet'),
    children: [
      {
        path: '/personalCenter',
        name: 'PersonalCenter',
        component: () => import('../components/Personalsetting/PersonalCenter')
      },
      {
        path: '/accountbinding',
        name: 'Accountbinding',
        component: () => import('../components/Personalsetting/Accountbinding')
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
