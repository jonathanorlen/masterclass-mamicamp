<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{name: 'Forum', params: {id: forum['.key']}}"
      >{{forum.name}}</router-link>
      <p>{{forum.description}}</p>
    </div>

    <div class="threads-count">
      <p class="count">{{threadsCount}}</p>
      {{threadsCount === 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread">
      <!-- <img class="avatar" src="https://i.imgur.com/WPSrfGm.jpg" alt />
      <div class="last-thread-details">
        <a href="thread.html">What is the best animal joke y...</a>
        <p class="text-xsmall">
          By
          <a href="profile.html">Blossom</a>, 16 hours ago
        </p>
      </div>-->
    </div>
  </div>
</template>

<script>
import {countObjectProperties} from '@/utils'
export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },

  computed: {
    threadsCount () {
      return countObjectProperties(this.forum.threads)
    }
  }
}
</script>
