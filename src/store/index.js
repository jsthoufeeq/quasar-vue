import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './store-tasks'
import settings from './store-settings'
import auth from './store-auth'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      tasks, settings, auth
    },

    strict: process.env.DEV
  })

  //   if (process.env.DEV && module.hot) {
  //     module.hot.accept(['./tasks'], () => {
  //       const newTasks = require('./tasks').default
  //       Store.hotUpdate({ modules: { tasks: newTasks } })
  //     })
  //   }

  return Store
}
