import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    authId: null,
    unsubscribeAutoObserver: null
  },
  getters: {
    authUser (state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null
    }
  },
  actions: {
    initAuthentication ({dispatch, commit, state}) {
      return new Promise((resolve, reject) => {
        if (state.unsubscribeAutoObserver) {
          state.unsubscribeAutoObserver()
        }
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('fetchAuthUser')
                .then(dbUser => resolve(dbUser))
          } else {
            resolve(null)
          }
        })

        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    },
    registerUserWithEmailAndPassword ({context, dispatch}, {email, name, password, username, avatar = null}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            return dispatch('users/createUser', {id: user.user.uid, email, name, username, avatar, password}, {root: true})
          })
          .then(() => dispatch('fetchAuthUser'))
    },
    signInWithEmailAndPassword (context, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signInWithGoogle ({dispatch}) {
      const provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWithPopup(provider)
          .then(data => {
            const user = data.user
            firebase.database().ref('users').child(user.uid).once('value', snapshot => {
              if (!snapshot.exists()) {
                return dispatch('users/createUser', {id: user.uid, name: user.displayName, email: user.email, username: user.email, avatar: user.photoURL}, {root: true})
                .then(() => dispatch('fetchAuthUser'))
              }
            })
          })
    },
    signOut ({commit}) {
      return firebase.auth().signOut()
          .then(() => {
            commit('sethAuthId', null)
          })
    },
    fetchAuthUser ({dispatch, commit}) {
      const userId = firebase.auth().currentUser.uid
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(userId).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', {id: userId}, {root: true})
           .then(user => {
             commit('sethAuthId', userId)
             resolve(user)
           })
          } else {
            resolve(null)
          }
        })
      })
    }
  },
  mutations: {
    sethAuthId (state, id) {
      state.authId = id
    },
    setUnsubscribeAuthObserver (state, unsubscribe) {
      state.unsubscribeAutoObserver = unsubscribe
    }
  }
}
