import Vue from 'vue'
import { uid } from 'quasar'
const state = {
  tasks: {
    'ID1': {
      name: 'task 1',
      completed: false,
      dueDate: '20/09/2019',
      dueTime: '18:30'
    },
    'ID2': {
      name: 'task 2',
      completed: true,
      dueDate: '20/09/2019',
      dueTime: '18:30'
    },
    'ID3': {
      name: 'task 3',
      completed: false,
      dueDate: '20/09/2019',
      dueTime: '18:30'
    }
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
  }
}

const actions = {
  updateTask ({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask ({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask ({ commit }, newTask) {
    let taskID = uid() // generates a random unique ID
    let payload = {
      id: taskID,
      task: newTask
    }
    commit('addTask', payload)
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
