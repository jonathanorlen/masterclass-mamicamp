<template>
  <div class="flex-grid">
    
    <UserProfileCard
      v-if="!edit"
      :user="user"
    />

    <UserProfileCardEditor
      v-else
      :user="user"
    />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{user.name}}</span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import PostList from '&/PostList'
import UserProfileCard from '&/UserProfileCard'
import UserProfileCardEditor from '&/UserProfileCardEditor'
import asyncDataStatus from '../mixins/asyncDataStatus'
import {mapGetters} from 'vuex'

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  mixins: [asyncDataStatus],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userPosts () {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
        .filter(post => post.userId === this.user['.key'])
      }
      return []
    }
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
