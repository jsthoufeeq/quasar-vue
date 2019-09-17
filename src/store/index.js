import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './store-tasks'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      tasks
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
