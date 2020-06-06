import {makeAppendChildToParentMutation} from '@/store/assetHelpers'
import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {},
  actions: {
    fetchAllCategories ({state, commit}) {
      console.log('firebase', 'category', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', {resource: 'categories', id: categoryId, item: category}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    },
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id, emoji: 'categories'}, {root: true}),
    fetchCategories: ({dispatch}, {id}) => dispatch('fetchItems', {resource: 'categories', id, emoji: 'categories'}, {root: true})
  },
  mutations: {}

}
