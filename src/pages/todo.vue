<template>
  <q-page>
    <q-list separator v-if="Object.keys(tasks).length">
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"></task>
    </q-list>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
      @click="addTask"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"/>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    'task': require('./../components/Tasks/Task.vue').default,
    'add-task': require('./../components/Tasks/Modals/add-task.vue').default
  },
  methods: {
    addTask () {
      this.showAddTask = true
    }
  }
}
</script>

<style>
</style>
