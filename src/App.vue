<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <router-view :key="$router.path" v-show="showPage" @ready="pageReady" />
      <AppSpinner v-show="!showPage" />
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import TheNavbar from '&/TheNavbar'
import AppSpinner from '&/AppSpinner'

export default {
  components: {
    TheNavbar,
    AppSpinner
  },

  data () {
    return {
      showPage: false
    }
  },

  methods: {
    pageReady () {
      this.showPage = true
      NProgress.done()
    }
  },

  created () {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      NProgress.start()
      next()
    })
  }
}
</script>

<style>
@import "./assets/css/style.css";
@import "~nprogress/nprogress.css";
</style>
