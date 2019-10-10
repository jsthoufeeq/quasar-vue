/* eslint-disable no-empty-pattern */
import { firebaseAuth } from '../boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser ({}, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('resp', response)
      })
      .catch(function (error) {
        showErrorMessage(error.message)
      })
  },
  loginUser ({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('resp', response)
      })
      .catch(function (error) {
        showErrorMessage(error.message)
      })
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/')
        dispatch('tasks/firebaseReadData', null, { root: true })
      } else {
        commit('tasks/clearTasks', null, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth')
      }
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
