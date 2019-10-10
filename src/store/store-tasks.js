/* eslint-disable no-empty-pattern */
import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb } from '../boot/firebase'
import { showErrorMessage } from 'src/functions/show-error-message'
const state = {
  tasks: {
    // 'ID1': {
    //   name: 'task 1',
    //   completed: false,
    //   dueDate: '2019/09/20',
    //   dueTime: '18:30'
    // },
    // 'ID2': {
    //   name: 'task 2',
    //   completed: true,
    //   dueDate: '2019/10/25',
    //   dueTime: '18:30'
    // },
    // 'ID3': {
    //   name: 'task 3',
    //   completed: false,
    //   dueDate: '2019/11/22',
    //   dueTime: '18:30'
    // }
  }
}

const mutations = {
  updateTask (state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask (state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks (state) {
    state.tasks = {}
  }
}

const actions = {
  updateTask ({ dispatch }, payload) {
    dispatch('firebaseUpdateTask', payload)
  },
  deleteTask ({ dispatch }, id) {
    dispatch('firebaseDeleteTask', id)
  },
  addTask ({ dispatch }, newTask) {
    let taskID = uid() // generates a random unique ID
    let payload = {
      id: taskID,
      task: newTask
    }
    dispatch('firebaseAddTask', payload)
  },
  firebaseReadData ({ commit }) {
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref(`tasks/${userId}`)

    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    userTasks.on('child_removed', snapshot => {
      commit('deleteTask', snapshot.key)
    })
  },
  firebaseAddTask ({}, payload) {
    let uid = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${uid}/${payload.id}`)
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task added')
      }
    })
  },
  firebaseUpdateTask ({}, payload) {
    let uid = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${uid}/${payload.id}`)
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task updated')
      }
    })
  },
  firebaseDeleteTask ({}, id) {
    let uid = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${uid}/${id}`)
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task deleted')
      }
    })
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
