<template>
  <div v-if="asyncDataStatus_fetched" class="col-full push-top">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import CategoryList from '&/CategoryList'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {

  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  created () {
    this.fetchAllCategories()
    .then(categories => Promise.all(categories.map(category => this.fetchForums({ids: Object.values(category.forums)})))
      .then(() => {
        this.asyncDataStatus_fetched()
      })
    )
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
