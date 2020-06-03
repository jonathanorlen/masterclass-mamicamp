// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/database'
import App from './App'
import router from './router'
import AppDate from '&/AppDate'
import store from '@/store'

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDFMqIpd126W8NKS5kdbo0hX8gFRacpu_Y',
  authDomain: 'vue-school-form-252a2.firebaseapp.com',
  databaseURL: 'https://vue-school-form-252a2.firebaseio.com',
  projectId: 'vue-school-form-252a2',
  storageBucket: 'vue-school-form-252a2.appspot.com',
  messagingSenderId: '562674392057',
  appId: '1:562674392057:web:50cb4ec7760ae801d0fb28',
  measurementId: 'G-F2SS7MSFXP'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    store.dispatch('fetchUser', {id: store.state.authId})
  }
})
