<template>
  <div class="col-large push-top">
    <h1>{{thread.title}}</h1>
    <p>
      By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor 
      :threadId="id"
    />
  </div>
</template>

<script>
import PostList from '&/PostList'
import PostEditor from '&/PostEditor'

export default {
  components: {
    PostList,
    PostEditor
  },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  data () {
    return {
    }
  },

  computed: {
    thread () {
      return this.$store.state.threads[this.id]
    },
    posts () {
      const postsIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts)
        .filter(post => postsIds.includes(post['.key']))
    }
  }
}
</script>

<style>
@import "../assets/css/style.css";
</style>
