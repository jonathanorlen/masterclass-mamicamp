import {countObjectProperties} from '@/utils'
import firebase from 'firebase'
import Vue from 'vue'
import {makeAppendChildToParentMutation} from '@/store/assetHelpers'

export default {
  namespaced: true,
  state: {
    items: {} // state.threads.items[id]
  },
  getters: {
    threadRepliesCount: state => id => countObjectProperties(state.items[id].posts) - 1
  },
  actions: {
    createThread ({state, commit, dispatch, rootState}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = firebase.database().ref('threads').push().key
        const postId = firebase.database().ref('posts').push().key
        const userId = rootState.auth.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {
          forumId,
          title,
          publishedAt,
          userId,
          posts: {}
        }
        thread.posts[postId] = postId
        const post = {
          text,
          publishedAt,
          threadId,
          userId
        }

        const updates = {}
        updates[`threads/${threadId}`] = thread
        updates[`forums/${forumId}/threads/${threadId}`] = threadId
        updates[`users/${userId}/threads/${threadId}`] = threadId
        updates[`posts/${postId}`] = post
        updates[`users/${userId}/posts/${postId}`] = postId
        firebase.database().ref().update(updates)
         .then(() => {
           commit('setItem', {resource: 'threads', item: thread, id: threadId}, {root: true})
           commit('forums/appendThreadToForum', {parentId: forumId, childId: threadId}, {root: true})
           commit('users/appendThreadToUser', {parentId: userId, childId: threadId}, {root: true})
           commit('setItem', { resource: 'posts', item: post, id: postId }, {root: true})
           commit('appendPostToThread', { parentId: post.threadId, childId: postId }, {root: true})
           commit('users/appendPostToUser', { parentId: post.userId, childId: postId }, {root: true})
           resolve(state.items[threadId])
         })
      })
    },
    updateThread ({state, commit, dispatch, rootState}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.items[id]
        const post = rootState.posts.items[thread.firstPostId]

        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }
        const updates = {}
        updates[`posts/${thread.firstPostId}/text`] = text
        updates[`posts/${thread.firstPostId}/edited`] = edited
        updates[`threads/${id}/title`] = title

        firebase.database().ref().update(updates)
      .then(() => {
        commit('setThread', {thread: {...thread, title}, threadId: id})
        commit('posts/setPost', {postId: thread.firstPostId, post: {...post, text, edited}}, {root: true})
        resolve(post)
      })
      })
    },
    fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'threads', id, emoji: 'S'}, {root: true}),
    fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'threads', ids, emoji: 'threads'}, {root: true})
  },
  mutations: {
    setThread (state, {thread, threadId}) {
      Vue.set(state.items, threadId, thread)
    },
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'})
  }
}