<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{user.name}}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt />
      </a>

      <p class="desktop-only text-small">{{userPostCount}} posts</p>
    </div>

    <div class="post-content">
      <div v-if="!editing">
        <p>{{post.text}}</p>
      </div>
      <div v-else>
        <PostEditor
          :post="post"
          @save="editing = false"
        />
      </div>
    </div>

    <div class="post-date text-faded" >
      <AppDate :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
import AppDate from './AppDate'
import {countObjectProperties} from '@/utils'
import PostEditor from './PostEditor'

export default {
  components: {
    AppDate,
    PostEditor
  },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      editing: true
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostCount () {
      return countObjectProperties(this.user.posts)
    }
  }
}
</script>