import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import http from './assets/js/http'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);

Vue.prototype.$http = http

// 将download方法注册为全局
Vue.prototype.download = function (res) {
  let data = res.data
  if (!data) {
    return
  }
  console.log('disposition2:' + res.headers['content-disposition'])
  let disposition = res.headers['content-disposition']
  let fileName = decodeURI(disposition.replace('attachment;filename=', ''))
  let url = window.URL.createObjectURL(new Blob([data]))
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click() //执行下载
  window.URL.revokeObjectURL(a.href) //释放url
  document.body.removeChild(a) //释放标签
}

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
