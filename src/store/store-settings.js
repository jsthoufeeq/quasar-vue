import { LocalStorage } from 'quasar'

const state = {
  settings: {
    show12HourTimeFormat: false
  }
}

const mutations = {
  change12HourTimeFormat (state, value) {
    state.settings.show12HourTimeFormat = value
  },
  setSettings (state, settings) {
    Object.assign(state.settings, settings)
  }
}

const actions = {
  change12HourTimeFormat ({ commit, dispatch }, value) {
    commit('change12HourTimeFormat', value)
    dispatch('saveSettings')
  },
  saveSettings ({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings ({ commit }) {
    let settings = LocalStorage.getItem('settings')
    if (settings) {
      commit('setSettings', settings)
    }
  }
}

const getters = {
  settings: (state) => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
